import { Injectable, NotFoundException } from '@nestjs/common';

export interface StudyPlan {
  id: string;
  studentId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class StudyPlansService {
  private studyPlans: StudyPlan[] = [];
  private nextId = 1;

  create(
    studentId: string,
    studyPlan: Omit<
      StudyPlan,
      'id' | 'studentId' | 'completed' | 'createdAt' | 'updatedAt'
    >,
  ): StudyPlan {
    const newStudyPlan: StudyPlan = {
      id: (this.nextId++).toString(),
      studentId,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...studyPlan,
    };
    this.studyPlans.push(newStudyPlan);
    return newStudyPlan;
  }

  findAllByStudent(studentId: string): StudyPlan[] {
    return this.studyPlans.filter((sp) => sp.studentId === studentId);
  }

  findById(id: string): StudyPlan {
    const sp = this.studyPlans.find((s) => s.id === id);
    if (!sp) throw new NotFoundException('Study plan not found');
    return sp;
  }

  update(
    id: string,
    updates: Partial<Omit<StudyPlan, 'id' | 'studentId' | 'createdAt'>>,
  ): StudyPlan {
    const index = this.studyPlans.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException('Study plan not found');
    this.studyPlans[index] = {
      ...this.studyPlans[index],
      ...updates,
      updatedAt: new Date(),
    };
    return this.studyPlans[index];
  }

  delete(id: string): void {
    const index = this.studyPlans.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException('Study plan not found');
    this.studyPlans.splice(index, 1);
  }

  markCompleted(id: string): StudyPlan {
    return this.update(id, { completed: true });
  }
}
