import { Module } from '@nestjs/common';
import { MessagesController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { KeyWord, KeyWordSchema } from 'src/keyword/schemas/keyword.schema';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/users/constants';
import { Users, UsersSchema } from 'src/users/schemas/users.schema';
import { MessageService } from './message.service';
import { MessageRepository } from './message.repository';

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
  ],
  providers: [MessageService, MessageRepository],
  controllers: [MessagesController]
})
export class MessagesModule {}
