import { Module } from '@nestjs/common';
import { Visit, VisitSchema } from './schemas/visit.schema';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitRepository } from './visit.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Visit.name, schema: VisitSchema }]),
  ],
  controllers: [VisitController],
  providers: [VisitService, VisitRepository]
})
export class VisitModule {}
