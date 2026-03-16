import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AssessmentsService, Assessment } from './assessments.service';

@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Post()
  create(@Body() dto: Omit<Assessment, 'id'>) {
    return this.assessmentsService.create(dto);
  }

  @Get()
  findAll(): Assessment[] {
    return this.assessmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assessmentsService.findById(id);
  }
}
