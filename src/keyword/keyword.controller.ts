import { Controller, Get, Res, Body, Post } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateKeyWordDto } from './dto/create-keyword.dto';
import { KeyWord } from './schemas/keyword.schema';
import { Message } from './schemas/message.schema';
import { GetUser } from 'src/users/get-user.decorator';
import { Users } from 'src/Users/schema/Users.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('keyword')
@Controller('keyword')
export class KeywordController {
  constructor(private keywordService: KeywordService) {}

  @Post()
  @ApiOperation({ 
    summary: '주제 DB 입력 (개발용)', 
})
  addKeyWord(@Body() createKeyWordDto: CreateKeyWordDto): Promise<KeyWord> {
    return this.keywordService.addKeyWord(createKeyWordDto);
  }

  @Get()
  @ApiOperation({ 
    summary: '오늘의 주제, 마니또 여부 조회', 
})
  async getKeyWord(@GetUser() user:Users, @Res() res): Promise<any[]> {
      console.log(user)
      const result = await this.keywordService.findKeyWord();
      const todayKeyWord = result[0]
      return res.json({todayKeyWord})
  }

  @Post('/message/today')
  async postTodayMessage(@GetUser() user:Users, @Body() createMessageDto: CreateMessageDto,): Promise<Message> {
    return this.keywordService.saveTodayMessage(user, createMessageDto);
  }

//   @Get('/message/today')
//   async getTodayMessage(): Promise<Message> {
//     return this.keywordService.findTodayMessage();
//   }
}
