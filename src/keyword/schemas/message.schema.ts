import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type MessageDocument = Message & Document;

const options: SchemaOptions = {
  timestamps: true,
  versionKey: false,
};

@Schema(options)
export class Message {
  @ApiProperty({
    description: 'Message의 objectId',
  })
  _id;

  //   @ApiProperty({
//     type: [User],
//     description: '보내는 사람',
//   })
//   @Prop({
//     type: mongoose.Schema.Types.ObjectId,
//     description: '보내는 사람',
//     ref: 'User',
//   })
//   fromUser: User;

//   @ApiProperty({
//     type: [User],
//     description: '받는 사람',
//   })
//   @Prop({
//     type: mongoose.Schema.Types.ObjectId,
//     description: '받는 사람',
//     ref: 'User',
//   })
//   toUser: User;

  @ApiProperty({
    type: String,
    description: '쪽지 내용',
  })
  @Prop()
  content: string;

  @ApiProperty({
    type: String,
    description: '쪽지의 주제',
  })
  @Prop({
    default: null,
  })
  keyword: string;

  /* timestamps */
  @ApiProperty({
    type: Date,
    description: '작성 날짜',
  })
  createdAt: Date;
  @ApiProperty({
    type: Date,
    description: '수정 날짜',
  })
  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
