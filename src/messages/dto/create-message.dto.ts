import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {

  toUser:string;
  fromUser:string;
  state: boolean;
  keyWord: string;    

  @ApiProperty({ type: String, description: '쪽지 내용', })
  @IsNotEmpty()
  @IsString()
  readonly content: string;
}