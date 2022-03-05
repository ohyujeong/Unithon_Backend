import { ApiProperty } from '@nestjs/swagger';

export class CreateKeyWordDto {
  @ApiProperty({ type: String, default: '글감' })
  content: string;
}