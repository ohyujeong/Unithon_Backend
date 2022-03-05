import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessagesService {
    constructor(
        private readonly messagesRepository: MessagesRepository
      ) {}
    async saveTodayMessage(user, createMessageDto): Promise<Message> {
        return await this.messagesRepository.saveTodayMessage(user, createMessageDto);
      }
    
      // async getTodayMessage(user): Promise<Message>{
          // return await this.keywordRepository.getTodayMessage(user);
      // }


}
