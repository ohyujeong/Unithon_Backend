import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { KeyWordRepository } from './keyword.repository';
import { KeyWord } from './schemas/keyword.schema';
import { Message } from '../messages/schemas/message.schema';

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

  async findKeyWord(user): Promise<any[]> {
      return await this.keywordRepository.findKeyWord(user);
  }
}
