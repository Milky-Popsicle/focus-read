import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { StudyPlansService } from './study-plans.service';
import type { StudyPlan } from './study-plans.service';

@Controller('study-plans')
export class StudyPlansController {
  constructor(private readonly studyPlansService: StudyPlansService) {}

  @Post(':studentId')
  create(
    @Param('studentId') studentId: string,
    @Body() dto: { title: string; description: string },
  ): StudyPlan {
    return this.studyPlansService.create(studentId, dto);
  }

  @Get('student/:studentId')
  findAllByStudent(@Param('studentId') studentId: string): StudyPlan[] {
    return this.studyPlansService.findAllByStudent(studentId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): StudyPlan {
    return this.studyPlansService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: { title?: string; description?: string },
  ): StudyPlan {
    return this.studyPlansService.update(id, dto);
  }

  @Patch(':id/complete')
  markCompleted(@Param('id') id: string): StudyPlan {
    return this.studyPlansService.markCompleted(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.studyPlansService.delete(id);
  }
}
