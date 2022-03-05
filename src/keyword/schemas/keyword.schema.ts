import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type KeyWordDocument = KeyWord & Document;

const options: SchemaOptions = {
  versionKey: false,
};

@Schema(options)
export class KeyWord {
  @ApiProperty({
    description: 'keyword의 objectId',
  })
  _id;

  @ApiProperty({
    type: String,
    description: '주제 내용',
  })
  @Prop()
  content: string;

  @ApiProperty({
    type: String,
    description: '주제가 사용된 날짜',
  })
  @Prop({
    default: null,
  })
  updateDay: string;
}

export const KeyWordSchema = SchemaFactory.createForClass(KeyWord);
