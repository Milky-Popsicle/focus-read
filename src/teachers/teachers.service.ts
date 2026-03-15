import { Injectable, NotFoundException } from '@nestjs/common';

export interface Teacher {
  id: string;
  userId: string;
}

@Injectable()
export class TeachersService {
  private teachers: Teacher[] = [];
  private nextId = 1;

  create(teacher: Omit<Teacher, 'id'>): Teacher {
    const newT: Teacher = { id: (this.nextId++).toString(), ...teacher };
    this.teachers.push(newT);
    return newT;
  }

  findAll(): Teacher[] {
    return [...this.teachers];
  }

  findById(id: string): Teacher {
    const t = this.teachers.find(te => te.id === id);
    if (!t) throw new NotFoundException('Teacher not found');
    return t;
  }
}

