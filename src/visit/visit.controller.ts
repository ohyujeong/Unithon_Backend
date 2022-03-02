import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { Visit } from 'src/visit/schemas/visit.schema';
import { VisitService } from './visit.service';

@Controller('visit')
export class VisitController {
    constructor(private readonly visitService:VisitService){}
    @Post('/')
    @ApiBody({ type : Visit })
    async saveVisit(@Body() visit) {
        await this.visitService.saveVisit(visit);
    }
}
