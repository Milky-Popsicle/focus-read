import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UsersService, User } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put(':id/profile-picture')
  updateProfilePicture(
    @Param('id') id: string,
    @Body() body: { profilePicture: string },
  ) {
    return this.usersService.updateProfilePicture(id, body.profilePicture);
  }
}
