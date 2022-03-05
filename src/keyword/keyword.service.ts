import { Injectable } from '@nestjs/common';
import { KeyWordRepository } from './keyword.repository';
import { Cron } from '@nestjs/schedule';
import { KeyWord } from './schemas/keyword.schema';
import { Message } from './schemas/message.schema';

@Injectable()
export class KeywordService {
  constructor(
    private readonly keywordRepository: KeyWordRepository,
  ) {}

  async addKeyWord(createKeyWordDto): Promise<KeyWord> {
    return this.keywordRepository.saveKeyWord(createKeyWordDto);
  }

//   @Cron('20 * * * * *')
  @Cron('0 0 0 * * *')
  async updateKeyWord(): Promise<KeyWord> {
    return this.keywordRepository.updateKeyWord();
  }

  async findKeyWord(): Promise<any[]> {
      return await this.keywordRepository.findKeyWord();
  }

  async saveTodayMessage(user, createMessageDto): Promise<Message> {
    return await this.keywordRepository.saveTodayMessage(user, createMessageDto);
  }

//   async findTodayMessage(): Promise<Message>{
//       return await this.keywordRepository.findTodayMessage();
//   }
}
