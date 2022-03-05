import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";
import { Users } from "../schema/users.schema";

// 다른 곳에서도 주입해서 사용
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
    ) {
        super({
            // 토큰 유효한지 체크
            secretOrKey: jwtConstants.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() 
            // Header의 Token으로부터 JWT를 추출하고, SecretKey와 만료기간 설정
        })
    }

    async validate(payload) {
        const { nickname } = payload;
        const user: Users = await this.usersRepository.findByNickname(nickname);

        if(!user) {
            throw new UnauthorizedException('UnAuthrozized User');
        }

        return user;
    }
}