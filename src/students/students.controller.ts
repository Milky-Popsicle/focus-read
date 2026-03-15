import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StudentsService, Student } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() dto: Omit<Student, 'id'>) {
    return this.studentsService.create(dto);
  }

  @Get()
  findAll(): Student[] {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findById(id);
  }
}

