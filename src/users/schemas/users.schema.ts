import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {

  _id: string;

  @Prop()
  nickname: string;

  @Prop()
  password: string;
 
  @Prop()
  generation: number; // z세대면 0, X세대면 1

  @Prop()
  state: number; // 마니또 없으면(쪽지 없으면) 0, 마니또 있으면(쪽지 받았으면)1
}

export const UsersSchema = SchemaFactory.createForClass(Users);