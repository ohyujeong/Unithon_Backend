import { Controller, Get, Res, Body, Post, UseGuards } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { ApiOperation, ApiBody, ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateKeyWordDto } from './dto/create-keyword.dto';
import { KeyWord } from './schemas/keyword.schema';
import { GetUser } from 'src/users/get-user.decorator';
import { JwtAuthGuard } from 'src/users/jwt/jwt.guard';
import { Users } from 'src/users/schemas/users.schema';
import { GetMain } from './dto/response.dto';

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
  @ApiResponse({
    type:GetMain,
  })
  async getKeyWord(@GetUser() user:Users, @Res() res): Promise<any[]> {
      const result = await this.keywordService.findKeyWord(user);
      const todayKeyWord = result[0]
      if(result[1] != null){
        const message = true
        return res.json({todayKeyWord, message})
      }
      else{
        const message = false
        return res.json({todayKeyWord, message})
      }
  }
}
