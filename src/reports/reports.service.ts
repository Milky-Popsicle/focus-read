import { Injectable } from '@nestjs/common';

export interface ProgressReport {
  id: string;
  studentId: string;
  averageScore: number;
  improvementRate: number;
}

@Injectable()
export class ReportsService {
  private reports: ProgressReport[] = [];
  private nextId = 1;

  create(dto: Omit<ProgressReport, 'id'>): ProgressReport {
    const r: ProgressReport = { id: (this.nextId++).toString(), ...dto };
    this.reports.push(r);
    return r;
  }

  findAll(): ProgressReport[] {
    return [...this.reports];
  }
}

