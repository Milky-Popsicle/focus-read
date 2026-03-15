import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { AssessmentsModule } from './assessments/assessments.module';
import { ReadingMaterialsModule } from './reading-materials/reading-materials.module';
import { ResultsModule } from './results/results.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, StudentsModule, TeachersModule, AssessmentsModule, ReadingMaterialsModule, ResultsModule, ReportsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
