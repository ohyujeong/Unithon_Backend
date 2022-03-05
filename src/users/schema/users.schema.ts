import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop()
  nickname: string;

  @Prop()
  password: string;
 
  @Prop()
  generation: number; // z세대면 0, X세대면 1
}

export const UsersSchema = SchemaFactory.createForClass(Users);