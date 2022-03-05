import { Module } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KeyWord, KeyWordSchema } from './schemas/keyword.schema';
import { KeywordController } from './keyword.controller';
import { KeyWordRepository } from './keyword.repository';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Message, MessageSchema } from './schemas/message.schema';


@Module({
  imports:[
    MongooseModule.forFeature([{ name: KeyWord.name, schema: KeyWordSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema}])
  ],
  providers: [KeywordService, KeyWordRepository, SchedulerRegistry],
  controllers: [KeywordController],
})
export class KeywordModule {}
