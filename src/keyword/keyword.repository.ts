import { InjectModel } from '@nestjs/mongoose';
import { KeyWord, KeyWordDocument } from './schemas/keyword.schema';
import { Model } from 'mongoose';
import { CreateKeyWordDto } from './dto/create-keyword.dto';
import { Message, MessageDocument } from './schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { Users, UsersDocument } from 'src/users/schema/users.schema';

export class KeyWordRepository {
  constructor(
    @InjectModel(KeyWord.name)
    private KeyWordModel: Model<KeyWordDocument>,
    @InjectModel(Message.name)
    private MessageModel: Model<MessageDocument>,
    @InjectModel(Users.name)
    private UsersModel: Model<UsersDocument>,
  ) {}
  private todayKeyWord: KeyWord;

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
    this.todayKeyWord = await this.KeyWordModel.findOneAndUpdate(
      { content: keyWord[0].content },
      {
        $set: {
          updateDay: today,
        },
      },
    );
    return this.todayKeyWord;
  }

  //개발용 함수 (서버 계속 껐다 키니까 presenetKeyWord 변수 만들어서 임시적으로 오늘의 키워드 저장해주고 보여줌)
  async findKeyWord(user): Promise<any[]> {
    const today = new Date().toDateString();
    let result: any[] = [];
    const presentkeyWord = await this.KeyWordModel.findOne({
      updateDay: today,
    });
    this.todayKeyWord = presentkeyWord;
    result.push(this.todayKeyWord);
    //유저에게 오늘 쪽지 왔는지 여부 확인
    const message = await this.KeyWordModel.findOne({keyWord:this.todayKeyWord, toUser:user._id})
    if(message){
      await this.UsersModel.findByIdAndUpdate(user._id,{
        $set:{
          state: 1
        }
      })
    }
    result.push(message)
    return result;
  }

  /*배포용
  async findKeyWord(user): Promise<any[]> {
   let result:any[] = [];
   result.push(this.todayKeyWord)
    const message = await this.KeyWordModel.findOne({keyWord:this.todayKeyWord, toUser:user.nickname})
    result.push(message)
    return result;
  }
  */

  async saveTodayMessage(
    user,
    createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    const content = createMessageDto.content

    const today = new Date().toDateString();
    const presentkeyWord = await this.KeyWordModel.findOne({
      updateDay: today,
    });
    this.todayKeyWord = presentkeyWord;

    if(user.generation == 0){
      const toUser = await this.UsersModel.findOne({generation:1, state:0})
      if(!toUser){
        //임시저장
        const message = await new this.MessageModel({
          toUser:null,
          fromUser:user._id,
          keyword:this.todayKeyWord.content,
          content
        });
        return message.save();
      }
      else{
        //매칭 완료
        const message = await new this.MessageModel({
          toUser:toUser._id,
          fromUser:user._id,
          state:true,
          keyword:this.todayKeyWord.content,
          content
        });
        return message.save();
      }
    }
    else{
      const toUser = await this.UsersModel.findOne({generation:0, state:0})
      if(!toUser){
        const message = await new this.MessageModel({
          fromUser:user._id,
          keyword:this.todayKeyWord.content,
          content
        });
        return message.save();
      }
      else{
        const message = await new this.MessageModel({
          toUser:toUser._id,
          state:true,
          keyword:this.todayKeyWord.content,
          content
        });
        return message.save();
      }
    }
  }

  //   async findTodayMessage(): Promise<Message> {
  //     //함수 계속 껐다 켜서 만들어논 임시 변수(presentKeyWord)
  //     const today = new Date().toDateString();
  //     const presentkeyWord = await this.KeyWordModel.findOne({ updateDay: today });
  //     this.todayKeyWord = presentkeyWord;

  //     const todayMessage = await this.MessageMdoel.findOne({keyword:this.todayKeyWord, })
  //   }
}
