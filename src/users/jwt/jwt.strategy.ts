import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";
import { Users } from "../schemas/users.schema";
import { UsersRepository } from "../users.repository";
import { UsersService } from "../users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService
    ) {
        super({
            secretOrKey: jwtConstants.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() 
        })
    }

    async validate(payload) {
        const { nickname } = payload;
        const user: Users = await this.usersService.findByNickname(nickname);

        if(!user) {
            throw new UnauthorizedException('UnAuthozized User');
        }
        return user;
    }
}

