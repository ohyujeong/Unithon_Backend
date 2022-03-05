import { Module } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KeyWord, KeyWordSchema } from './schemas/keyword.schema';
import { KeywordController } from './keyword.controller';
import { KeyWordRepository } from './keyword.repository';
import { Message, MessageSchema } from './schemas/message.schema';
import { UsersModule } from 'src/users/users.module';
import { Users, UsersSchema } from 'src/users/schema/users.schema';


@Module({
  imports:[
    MongooseModule.forFeature([{ name: KeyWord.name, schema: KeyWordSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema}]),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    UsersModule
  ],
  providers: [KeywordService, KeyWordRepository],
  controllers: [KeywordController],
})
export class KeywordModule {}
