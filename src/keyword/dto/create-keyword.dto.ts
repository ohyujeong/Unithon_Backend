import { ApiProperty } from '@nestjs/swagger';

export class CreateKeyWordDto {
  @ApiProperty({ type: String, default: '오늘의 주제' })
  content: string;
}