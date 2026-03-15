import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TeachersService, Teacher } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  create(@Body() dto: Omit<Teacher, 'id'>) {
    return this.teachersService.create(dto);
  }

  @Get()
  findAll(): Teacher[] {
    return this.teachersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findById(id);
  }
}

