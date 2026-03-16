import { Module } from '@nestjs/common';
import { StudyPlansController } from './study-plans.controller';
import { StudyPlansService } from './study-plans.service';

@Module({
  controllers: [StudyPlansController],
  providers: [StudyPlansService],
})
export class StudyPlansModule {}
