import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReportsService, ProgressReport } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  create(@Body() dto: Omit<ProgressReport, 'id'>) {
    return this.reportsService.create(dto);
  }

  @Get()
  findAll(): ProgressReport[] {
    return this.reportsService.findAll();
  }
}
