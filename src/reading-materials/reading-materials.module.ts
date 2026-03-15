import { Module } from '@nestjs/common';
import { ReadingMaterialsController } from './reading-materials.controller';
import { ReadingMaterialsService } from './reading-materials.service';

@Module({
  controllers: [ReadingMaterialsController],
  providers: [ReadingMaterialsService]
})
export class ReadingMaterialsModule {}
