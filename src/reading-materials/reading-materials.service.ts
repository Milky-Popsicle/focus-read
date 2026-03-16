import { Injectable, NotFoundException } from '@nestjs/common';

export interface ReadingMaterial {
  id: string;
  title: string;
  content: string;
  createdBy: string;
}

@Injectable()
export class ReadingMaterialsService {
  private materials: ReadingMaterial[] = [];
  private nextId = 1;

  create(dto: Omit<ReadingMaterial, 'id'>): ReadingMaterial {
    const m: ReadingMaterial = { id: (this.nextId++).toString(), ...dto };
    this.materials.push(m);
    return m;
  }

  findAll(): ReadingMaterial[] {
    return [...this.materials];
  }

  findById(id: string): ReadingMaterial {
    const m = this.materials.find((x) => x.id === id);
    if (!m) throw new NotFoundException('Material not found');
    return m;
  }
}
