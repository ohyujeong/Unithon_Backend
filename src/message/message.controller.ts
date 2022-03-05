import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { GetUser } from 'src/users/get-user.decorator';
import { Users } from 'src/users/schemas/users.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './schemas/message.schema';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/jwt/jwt.guard';
import { MessageService } from './message.service';

@ApiBearerAuth('accessToken')
@UseGuards(JwtAuthGuard)
@Controller('messages')
@ApiTags('메시지 API')
export class MessagesController {
  logger: any;
  constructor(private messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: '쪽지 저장' })
  async postTodayMessage(
    @GetUser() user: Users,
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    return this.messageService.saveTodayMessage(user, createMessageDto);
  }

  @Patch()
  @ApiOperation({ summary: '쪽지 전송' })
  async updateTodayMessage(@GetUser() user: Users):Promise<String> {
    return await this.messageService.sendTodayMessage(user);
  }

  @Get('')
  @ApiOperation({ summary: '받은 쪽지 조회' })
  async getTodayMessage(@Res() res, @GetUser() user: Users) {
    try {
      const message = await this.messageService.getTodayMessage(user);
      if (!message)
        return res.status(HttpStatus.OK).json({
          message: '받은 쪽지가 없어요',
        });
      return res.status(HttpStatus.OK).json(message);
    } catch (error) {
      this.logger.error('쪽지 조회 ERROR' + error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}
