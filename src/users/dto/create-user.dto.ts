import { Prop, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto{
    @ApiProperty({
        example: '삼시세끼',
        description: '닉네임',
        required: true,
    })  
    @IsNotEmpty()
    @IsString()
    nickname: string;

    @ApiProperty({
        example: 'samshisekkijjang',
        description: '비밀번호',
        required: true,
    })  
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        example: 0,
        description: '세대',
        required: true,
    })  
    @IsNotEmpty()
    @IsNumber()
    generation: number;
}