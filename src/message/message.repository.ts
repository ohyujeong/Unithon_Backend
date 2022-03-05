import { InjectModel } from '@nestjs/mongoose';
import { KeyWord, KeyWordDocument } from 'src/keyword/schemas/keyword.schema';
import { Users, UsersDocument } from 'src/users/schemas/users.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message, MessageDocument } from './schemas/message.schema';
import { Model } from 'mongoose';

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

  async sendTodayMessage(user):Promise<String> {

    const today = new Date().toDateString();
    const todayKeyWord = await this.KeyWordModel.findOne({
      updateDay: today,
    });

    const filter = {fromUser:user._id, keyWord:todayKeyWord.content, state:false}

    if (user.generation == 0) {
      const toUser = await this.UsersModel.findOne({ generation: 1, state: 0 });
      if(toUser) {
        //매칭 완료
        await this.MessageModel.findOneAndUpdate(filter,{
          $set:{
            toUser: toUser._id,
            state: true
          }
        })
        await this.UsersModel.findByIdAndUpdate(toUser._id,{
          $set:{
            state:1
          }
        })
        return '전송 완료';
      }
      else{
        return '매칭 대기';
      }
    } else {
      const toUser = await this.UsersModel.findOne({ generation: 0, state: 0 });
      if (toUser) {
        await this.MessageModel.findOneAndUpdate(filter,{
          $set:{
            toUser: toUser._id,
            state: true
          }
        })
        await this.UsersModel.findByIdAndUpdate(toUser._id,{
          $set:{
            state:1
          }
        })
        return '전송 완료';
      }
      else{
        return '매칭 대기';
      }
    }
  }

  async getTodayMessage(user: Users): Promise<Message> {
    return await this.MessageModel.findOne({ toUser: user._id }); // 받는 사람이 로그인한 유저인 경우
  }
}
