import { InjectModel } from '@nestjs/mongoose';
import { KeyWord, KeyWordDocument } from './schemas/keyword.schema';
import { Model } from 'mongoose';
import { CreateKeyWordDto } from './dto/create-keyword.dto';
import { Message, MessageDocument } from '../message/schemas/message.schema';
import { Users, UsersDocument } from 'src/users/schemas/users.schema';

export class KeyWordRepository {
  constructor(
    @InjectModel(KeyWord.name)
    private KeyWordModel: Model<KeyWordDocument>,
    @InjectModel(Message.name)
    private MessageModel: Model<MessageDocument>,
    @InjectModel(Users.name)
    private UsersModel: Model<UsersDocument>,
  ) {}

  async saveKeyWord(createKeyWordDto: CreateKeyWordDto): Promise<KeyWord> {
    const KeyWord = new this.KeyWordModel(createKeyWordDto);
    return KeyWord.save();
  }

  async updateKeyWord(): Promise<KeyWord> {
    const today = new Date().toDateString();

    //안 쓴 키워드 중에서 매일 키워드 하나를 랜덤 추출해주고 추출한 키워드 정보를 업데이트 해줌
    const keyWord = await this.KeyWordModel.aggregate([
      { $match: { updateDay: null } },
      { $sample: { size: 1 } },
    ]);
    const todayKeyWord = await this.KeyWordModel.findOneAndUpdate(
      { content: keyWord[0].content },
      {
        $set: {
          updateDay: today,
        },
      },
    );
    return todayKeyWord;
  }

  async findKeyWord(user): Promise<any[]> {
    const today = new Date().toDateString();
    let result: any[] = [];
    const todayKeyWord = await this.KeyWordModel.findOne({
      updateDay: today,
    });
    result.push(todayKeyWord);
    const message = await this.MessageModel.findOne({keyWord:todayKeyWord.content, toUser:user._id})
    if(message){
      await this.UsersModel.findByIdAndUpdate(user._id,{
        $set:{
          state:1
        }
      })
    }
    result.push(message)
    return result;
  }

  async resetMatch(): Promise<any> {
    return await this.UsersModel.updateMany({
      $set: {
        state: 0,
      },
    });
  }
}
