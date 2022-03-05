import { Module } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KeyWord, KeyWordSchema } from './schemas/keyword.schema';
import { KeywordController } from './keyword.controller';
import { KeyWordRepository } from './keyword.repository';
import { Message, MessageSchema } from './schemas/message.schema';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports:[
    MongooseModule.forFeature([{ name: KeyWord.name, schema: KeyWordSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema}]),
    UsersModule
  ],
  providers: [KeywordService, KeyWordRepository],
  controllers: [KeywordController],
})
export class KeywordModule {}
