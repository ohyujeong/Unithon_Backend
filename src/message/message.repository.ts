import { InjectModel } from '@nestjs/mongoose';
import { KeyWord, KeyWordDocument } from 'src/keyword/schemas/keyword.schema';
import { Users, UsersDocument } from 'src/users/schemas/users.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message, MessageDocument } from './schemas/message.schema';
import { Model } from 'mongoose';
import { createDeflate } from 'zlib';

export class MessageRepository {
  constructor(
    @InjectModel(KeyWord.name)
    private KeyWordModel: Model<KeyWordDocument>,
    @InjectModel(Message.name)
    private MessageModel: Model<MessageDocument>,
    @InjectModel(Users.name)
    private UsersModel: Model<UsersDocument>,
  ) {}

  async saveTodayMessage(
    user,
    createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    const content = createMessageDto.content;

    const today = new Date().toDateString();
    const todayKeyWord = await this.KeyWordModel.findOne({
      updateDay: today,
    });

    const message = await new this.MessageModel({
      toUser: null,
      fromUser: user._id,
      keyword: todayKeyWord.content,
      content,
    });
    return message.save();
  }

  async notSendMessage(user): Promise<Message> {
    return await this.MessageModel.findOne({ fromUser: user._id, state: 0 });
  }

  async matchingUser(user): Promise<Users> {
    if (user.generation == 0) {
      return await this.UsersModel.findOne({ generation: 1, state: 0 });
    } else {
      return await this.UsersModel.findOne({ generation: 0, state: 0 });
    }
  }

  async sendTodayMessage(user): Promise<String> {
    const today = new Date().toDateString();
    const todayKeyWord = await this.KeyWordModel.findOne({
      updateDay: today,
    });

    const filter = {
      fromUser: user._id,
      keyWord: todayKeyWord.content,
      state: false,
    };
    const toUser = this.matchingUser(user);

    if (toUser) {
      await this.MessageModel.findOneAndUpdate(filter, {
        $set: {
          toUser: toUser[0]._id,
          state: 1,
        },
      });
      await this.UsersModel.findByIdAndUpdate(toUser[0]._id, {
        $set: {
          state: 1,
        },
      });
      return '전송 완료';
    }
    else{
      return '매칭 대기'
    }
  }

  async getNotReadMessage(user: Users) {
    return await this.MessageModel.findOneAndUpdate({
      fromUser: user._id,
      readStatus: false,
      state: 1, // 전송 완료되었지만 아직 읽지 않은 쪽지 조회
    });
  }

  async updateCancelState(user: Users, message: Message) {
    // 해당 쪽지를 삭제로 상태변경
    await this.MessageModel.updateOne(
      {
        fromUser: user._id,
        _id: message._id,
      },
      { state: 2 },
    );
  }

  async getTodayMessage(user: Users): Promise<Message> {
    return await this.MessageModel.findOne({ toUser: user._id }); // 받는 사람이 로그인한 유저인 경우
  }
}
