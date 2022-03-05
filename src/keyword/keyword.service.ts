import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { KeyWordRepository } from './keyword.repository';
import { KeyWord } from './schemas/keyword.schema';

@Injectable()
export class KeywordService {
  constructor(
    private readonly keywordRepository: KeyWordRepository,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async addKeyWord(createKeyWordDto): Promise<KeyWord> {
    return this.keywordRepository.saveKeyWord(createKeyWordDto);
  }

  @Cron('0 0 0 * * *', { name: 'updatekeyword', timeZone: 'Asia/Seoul' })
  async updateKeyWord(): Promise<KeyWord> {
    this.schedulerRegistry.getCronJob('updatekeyword');
    return this.keywordRepository.updateKeyWord();
  }

  @Cron('0 0 0 * * *', { name: 'resetmatch', timeZone: 'Asia/Seoul' })
  async resetMatch(): Promise<any> {
    this.schedulerRegistry.getCronJob('resetmatch');
    return this.keywordRepository.resetMatch();
  }

  async findKeyWord(user): Promise<any[]> {
      return await this.keywordRepository.findKeyWord(user);
  }
}
