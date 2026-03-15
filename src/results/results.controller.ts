import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ResultsService, Result } from './results.service';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  create(@Body() dto: Omit<Result, 'id'>) {
    return this.resultsService.create(dto);
  }

  @Get()
  findAll(): Result[] {
    return this.resultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultsService.findById(id);
  }
}

