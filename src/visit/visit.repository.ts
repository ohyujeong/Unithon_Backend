import { Visit, VisitDocument } from "src/visit/schemas/visit.schema";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class VisitRepository {
    constructor(
      @InjectModel(Visit.name)
      private visitModel: Model<VisitDocument>,
    ){}

    async saveVisit(visit){
        const visits = new this.visitModel(visit);
        await visits.save();
    }
}