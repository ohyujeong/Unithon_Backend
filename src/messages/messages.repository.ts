import { InjectModel } from "@nestjs/mongoose";
import { KeyWord, KeyWordDocument } from "src/keyword/schemas/keyword.schema";
import { Users, UsersDocument } from "src/users/schemas/users.schema";
import { CreateMessageDto } from "./dto/create-message.dto";
import { Message, MessageDocument } from "./schemas/message.schema";
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
        createMessageDto.fromUser = user._id

        const today = new Date().toDateString();
        const presentkeyWord = await this.KeyWordModel.findOne({
        updateDay: today,
        });
        this.todayKeyWord = presentkeyWord;
        createMessageDto.keyWord = this.todayKeyWord[0].content;
        
        if(user.generation == 0){
        const toUser = await this.UsersModel.findOne({generation:1, state:0})
        if(!toUser){
            const message = await new this.MessageModel(createMessageDto);
            return message.save();
        }
        else{
            createMessageDto.toUser = toUser._id
            createMessageDto.state = true
            const message = await new this.MessageModel(createMessageDto);
            return message.save();
        }
        }
        else{
        const toUser = await this.UsersModel.findOne({generation:0, state:0})
        if(!toUser){
            const message = await new this.MessageModel(createMessageDto);
            return message.save();
        }
        else{
            createMessageDto.toUser = toUser._id
            createMessageDto.state = true
            const message = await new this.MessageModel(createMessageDto);
            return message.save();
        }
        }
    }

    // async getTodayMessage(user: Users): Promise<Message> {
    //    const { _id } = user;
    // }
}