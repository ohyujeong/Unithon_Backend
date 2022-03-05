import { ApiProperty } from '@nestjs/swagger';
import { KeyWord } from '../schemas/keyword.schema';

export class GetMain {
    @ApiProperty({
      type: KeyWord,
      description: '오늘의 주제',
    })
    KeyWord: KeyWord;
  
    @ApiProperty({
      type: Boolean,
      description: '오늘 쪽지 받았는지 여부, 없으면 false, 있으면 true',
    })
    Message: Boolean;
  }