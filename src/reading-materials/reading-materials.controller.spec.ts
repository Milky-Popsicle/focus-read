import { Test, TestingModule } from '@nestjs/testing';
import { ReadingMaterialsController } from './reading-materials.controller';

describe('ReadingMaterialsController', () => {
  let controller: ReadingMaterialsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReadingMaterialsController],
    }).compile();

    controller = module.get<ReadingMaterialsController>(
      ReadingMaterialsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
