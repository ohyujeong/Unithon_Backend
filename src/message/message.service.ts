import { Injectable } from '@nestjs/common';
import { Users } from 'src/users/schemas/users.schema';
import { MessageRepository } from './message.repository';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async saveTodayMessage(user, createMessageDto): Promise<Message> {
    return await this.messageRepository.saveTodayMessage(
      user,
      createMessageDto,
    );
  }

  async sendTodayMessage(user):Promise<String> {
    return await this.messageRepository.sendTodayMessage(user);
  }

  async getTodayMessage(user: Users) {
    const message = await this.messageRepository.getTodayMessage(user);
    if(message){
      const { createdAt } = message;
      const today = new Date();
      if(createdAt.toDateString() == today.toDateString()){ // 날짜가 같은 경우 readState 업뎃    
        await this.messageRepository.updateReadStatus(user, message); 
        return message;  // 읽은 여부 상태 변경
      }
    }
    return false;
  }

  async getMessages(user: Users){
    return await this.messageRepository.getMessages(user);
  }

  async cancelTodayMessage(user: Users): Promise<Boolean> {
    const message = await this.messageRepository.getNotReadMessage(user);
    if(message){ // 안 읽은 메시지가 있는 경우
      const { createdAt } = message;
      const today = new Date();

      if(createdAt.toDateString() == today.toDateString()){ // 날짜가 같은 경우 삭제
        await this.messageRepository.deleteMessage(user, message); 
        return true; // 안읽은 메시지가 있고 보내기 취소한 경우
      }
    }
    return false;
  }
}
