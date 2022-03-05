import { Body, Controller, Post } from '@nestjs/common';
import { GetUser } from 'src/users/get-user.decorator';
import { Users } from 'src/users/schemas/users.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { Message } from './schemas/message.schema';

@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) {}


    @Post('/message/today')
    async postTodayMessage(@GetUser() user:Users, @Body() createMessageDto: CreateMessageDto,): Promise<Message> {
      console.log(user)
      return this.messagesService.saveTodayMessage(user, createMessageDto);
    }
  
  //   @Get('/message/today')
  //   async getTodayMessage(): Promise<Message> {
  //     return this.keywordService.findTodayMessage();
  //   }
  
  //   @Get('/message')
  //   async getTodayMessage(@GetUser() user:Users): Promise<Message> {
  //       return this.keywordService.getTodayMessage(user);
  //   }
}
