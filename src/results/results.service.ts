import { Injectable, NotFoundException } from '@nestjs/common';

export interface Result {
  id: string;
  studentId: string;
  assessmentId: string;
  answer: string;
  score: number;
  dateTaken: string;
}

@Injectable()
export class ResultsService {
  private results: Result[] = [];
  private nextId = 1;

  create(dto: Omit<Result, 'id'>): Result {
    const r: Result = { id: (this.nextId++).toString(), ...dto };
    this.results.push(r);
    return r;
  }

  findAll(): Result[] {
    return [...this.results];
  }

  findById(id: string): Result {
    const r = this.results.find((x) => x.id === id);
    if (!r) throw new NotFoundException('Result not found');
    return r;
  }
}
