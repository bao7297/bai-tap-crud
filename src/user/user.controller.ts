import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  private user: User[] = [];

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      name: new String(createUserDto.name),
      id: this.user.length + 1
    };
    this.user.push(user);
    return user;
  }

  @Get()
  findAll() {
    return this.user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.user.find(
      user => user.id === parseInt(id)
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const index = this.user.findIndex(
      user => user.id === parseInt(id)
    );

    this.user[index] = {
      ...this.user[index],
      ...updateUserDto,
      name: updateUserDto.name ?
        new String(updateUserDto.name) : this.user[index].name
    }
    return this.user[index];
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.user = this.user.filter(
      user => user.id !==  parseInt(id));
  }
}
