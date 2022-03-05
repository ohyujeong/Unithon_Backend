import { InjectModel } from '@nestjs/mongoose';
import { KeyWord, KeyWordDocument } from 'src/keyword/schemas/keyword.schema';
import { Users, UsersDocument } from 'src/users/schemas/users.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message, MessageDocument } from './schemas/message.schema';
import { Model } from 'mongoose';

export class MessagesRepository {
  constructor(
    @InjectModel(KeyWord.name)
    private KeyWordModel: Model<KeyWordDocument>,
    @InjectModel(Message.name)
    private MessageModel: Model<MessageDocument>,
    @InjectModel(Users.name)
    private UsersModel: Model<UsersDocument>,
  ) {}
  private todayKeyWord: KeyWord;

  async saveTodayMessage(
    user,
    createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    const content = createMessageDto.content;

    const today = new Date().toDateString();
    const presentkeyWord = await this.KeyWordModel.findOne({
      updateDay: today,
    });
    this.todayKeyWord = presentkeyWord;

    console.log(user)
    if (user.generation == 0) {
      const toUser = await this.UsersModel.findOne({ generation: 1, state: 0 });
      if (!toUser) {
        //임시저장
        const message = await new this.MessageModel({
          toUser: null,
          fromUser: user._id,
          keyword: this.todayKeyWord.content,
          content,
        });
        return message.save();
      } else {
        //매칭 완료
        const message = await new this.MessageModel({
          toUser: toUser._id,
          fromUser: user._id,
          state: true,
          keyword: this.todayKeyWord.content,
          content,
        });
        return message.save();
      }
    } else {
      const toUser = await this.UsersModel.findOne({ generation: 0, state: 0 });
      if (!toUser) {
        const message = await new this.MessageModel({
          fromUser: user._id,
          keyword: this.todayKeyWord.content,
          content,
        });
        return message.save();
      } else {
        const message = await new this.MessageModel({
          toUser: toUser._id,
          state: true,
          keyword: this.todayKeyWord.content,
          content,
        });
        return message.save();
      }
    }
  }

  // async getTodayMessage(user: Users): Promise<Message> {
  //    const { _id } = user;
  // }
}
