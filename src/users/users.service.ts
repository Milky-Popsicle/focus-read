import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'student';
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  create(dto: CreateUserDto): User {
    const user: User = { id: (this.nextId++).toString(), ...dto };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return [...this.users];
  }

  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  findById(id: string): User {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}

