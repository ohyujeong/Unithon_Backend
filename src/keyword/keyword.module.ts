import { Module } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KeyWord, KeyWordSchema } from './schemas/keyword.schema';
import { KeywordController } from './keyword.controller';
import { KeyWordRepository } from './keyword.repository';
import { Message, MessageSchema } from '../message/schemas/message.schema';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/users/constants';
import { Users, UsersSchema } from 'src/users/schemas/users.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: KeyWord.name, schema: KeyWordSchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema}]),
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60m" }
    }),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    UsersModule
  ],
  providers: [KeywordService, KeyWordRepository],
  controllers: [KeywordController],
})
export class KeywordModule {}
