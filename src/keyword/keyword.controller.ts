import { Controller, Get, Res, Body, Post, UseGuards } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { ApiOperation, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateKeyWordDto } from './dto/create-keyword.dto';
import { KeyWord } from './schemas/keyword.schema';
import { GetUser } from 'src/users/get-user.decorator';
import { JwtAuthGuard } from 'src/users/jwt/jwt.guard';
import { Users } from 'src/users/schemas/users.schema';

@ApiBearerAuth('accessToken')
@UseGuards(JwtAuthGuard)
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
}
