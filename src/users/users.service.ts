import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private jwtService : JwtService,
    ){}

    async signUp(createUserDto: CreateUserDto){
        return await this.usersRepository.saveUser(createUserDto);
    }

    async signIn(loginUserDto: LoginUserDto){
        const { nickname, password } = loginUserDto;
        const user = await this.usersRepository.findByNickname(nickname);

        if(user && (await bcrypt.compare(password, user.password))) {
            const payload = { nickname };
            const accessToken = await this.jwtService.sign(payload);
            return accessToken;
        }
    }

    async findByNickname(nickname: string){
        return await this.usersRepository.findByNickname(nickname);
    }
}
