import { Injectable, NotFoundException } from '@nestjs/common';

export interface Student {
  id: string;
  userId: string;
  gradeLevel: string;
}

@Injectable()
export class StudentsService {
  private students: Student[] = [];
  private nextId = 1;

  create(student: Omit<Student, 'id'>): Student {
    const newStudent: Student = { id: (this.nextId++).toString(), ...student };
    this.students.push(newStudent);
    return newStudent;
  }

  findAll(): Student[] {
    return [...this.students];
  }

  findById(id: string): Student {
    const s = this.students.find(st => st.id === id);
    if (!s) throw new NotFoundException('Student not found');
    return s;
  }
}

