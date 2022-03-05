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
    return await this.messageRepository.getTodayMessage(user);
  }
}
