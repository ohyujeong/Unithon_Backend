import { Controller, Get, Res, Body, Post } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateKeyWordDto } from './dto/create-keyword.dto';
import { KeyWord } from './schemas/keyword.schema';
import { Message } from './schemas/message.schema';

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
  async getKeyWord(@Res() res): Promise<any[]> {
      const result = await this.keywordService.findKeyWord();
      const todayKeyWord = result[0]
      return res.json({todayKeyWord})
  }

//   @Get('/message/today')
//   async getTodayMessage(): Promise<Message> {
//     return this.keywordService.findTodayMessage();
//   }
}
