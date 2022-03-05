import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Logger, Post, Res, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly usersService: UsersService
    ){}

    @Post('/signup')
    @ApiOperation({ 
        summary: '회원가입 API', 
        description: '닉네임, 비밀번호, 세대 입력'
    })
    @ApiBody({ type: CreateUserDto })
    async signUp(
        @Res() res,
        @Body(ValidationPipe) createUserDto: CreateUserDto
    ): Promise<any> {
        try {
            const { nickname } = createUserDto;
            console.log(createUserDto)
            const nicknameUser = await this.usersService.findByNickname(nickname);
            if(nicknameUser)
                return res.
                    status(HttpStatus.CONFLICT)
                    .json({
                        success: false,
                        message: '중복된 닉네임이 있습니다.',
                    })
            const user = await this.usersService.signUp(createUserDto);
            return res
                .status(HttpStatus.OK)
                .json(user);
        } catch(error){
            this.logger.error('회원가입 ERROR'+error);
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json(error);
        }
    }

    @Post('/signin')
    @ApiOperation({ 
        summary: '로그인 API', 
        description: '닉네임, 비밀번호, 세대 입력'
    })
    @ApiBody({ type: LoginUserDto })
    async signIn(
        @Res() res,
        @Body(ValidationPipe) loginUserDto: LoginUserDto
    ): Promise<any> {
        // await this.usersService.signIn(loginUserDto);
        try{
            const { nickname } = loginUserDto;
            const accessToken = await this.usersService.signIn(loginUserDto);
            const user = await this.usersService.findByNickname(nickname);
            if(accessToken)
                return res
                    .status(HttpStatus.OK)
                    .json({
                        accessToken: accessToken,
                        message: '로그인 되었습니다',
                        userId: user._id,
                        success: true,
                    })
                
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({
                    message: '비밀번호가 일치하지 않습니다.',
                    success: false
                })
        } catch(error){
            this.logger.error('로그인 ERROR'+error);
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json(error);
        }
    }

    @Get('/:nickname') // 닉네임 중복 체크
    checkNickname(){

    }

    // @Get('/signup/:nickname')
    // @ApiOperation({ summary: '닉네임 중복 조회', description: '닉네임 입력' })
    // async findByNickname(
    //     @Res() res,
    //     @Param("nickname") nickname: string,
    // ): Promise<string> {
    //     try{
    //         const nickName = await this.authService.findByAuthNickname(nickname);
    //         if(nickName) 
    //             return res
    //                 .status(HttpStatus.CONFLICT)
    //                 .json({
    //                     success: false,
    //                     message: "중복된 닉네임이 존재합니다.",
    //                 })
            
    //         return res
    //             .status(HttpStatus.OK)
    //             .json({
    //                 success: true,
    //                 message: "사용 가능한 닉네임입니다.",
    //             })
    //     } catch(error){
    //         this.logger.error('닉네임 중복 조회 ERROR'+error);
    //         return res
    //             .status(HttpStatus.INTERNAL_SERVER_ERROR)
    //             .json(error);
    //     }
    // }

}
