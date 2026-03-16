import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {
  ReadingMaterialsService,
  ReadingMaterial,
} from './reading-materials.service';

@Controller('reading-materials')
export class ReadingMaterialsController {
  constructor(private readonly materialsService: ReadingMaterialsService) {}

  @Post()
  create(@Body() dto: Omit<ReadingMaterial, 'id'>) {
    return this.materialsService.create(dto);
  }

  @Get()
  findAll(): ReadingMaterial[] {
    return this.materialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findById(id);
  }
}
