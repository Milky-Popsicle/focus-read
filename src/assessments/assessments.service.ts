import { Injectable, NotFoundException } from '@nestjs/common';

export interface Assessment {
  id: string;
  materialId: string;
  question: string;
  correctAnswer: string;
}

@Injectable()
export class AssessmentsService {
  private assessments: Assessment[] = [];
  private nextId = 1;

  create(dto: Omit<Assessment, 'id'>): Assessment {
    const a: Assessment = { id: (this.nextId++).toString(), ...dto };
    this.assessments.push(a);
    return a;
  }

  findAll(): Assessment[] {
    return [...this.assessments];
  }

  findById(id: string): Assessment {
    const a = this.assessments.find((x) => x.id === id);
    if (!a) throw new NotFoundException('Assessment not found');
    return a;
  }
}
