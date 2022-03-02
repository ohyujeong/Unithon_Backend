import { Injectable } from '@nestjs/common';
import { VisitRepository } from './visit.repository';

@Injectable()
export class VisitService {
    constructor(private readonly visitRepository:VisitRepository){}

    async saveVisit(visit: number){
        return this.visitRepository.saveVisit(visit);
    }

}
