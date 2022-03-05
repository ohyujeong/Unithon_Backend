import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Users, UsersDocument } from "./schema/users.schema";
import { CreateUserDto } from './dto/create-user.dto';
import { bcryptConstant } from './constants';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

export class UsersRepository {
    constructor(
        @InjectModel(Users.name)
            private userModel: Model<UsersDocument>
    ){}

    async saveUser(createUserDto: CreateUserDto){
        const { nickname, password, generation } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, bcryptConstant.saltOrRounds)
        const user = {
            nickname,
            password: hashedPassword,
            generation
        }
        const newUser = new this.userModel(user);
        return await newUser.save();
        // 유저를 저장하고 
    }

    async loginUser(loginUserDto: LoginUserDto){
        const { nickname, password } = loginUserDto;
        
    }

    async findByNickname(nickname: string){
        return await this.userModel.findOne({nickname});
    }
}