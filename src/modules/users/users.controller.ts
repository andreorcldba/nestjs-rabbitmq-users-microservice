import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GlobalRouteDecorator } from 'src/decorators/global-route.docorator';
import { User } from './entities/users.entity';
import { DeleteResult } from 'typeorm';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GlobalRouteDecorator('createUser')
  create(@Payload() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @GlobalRouteDecorator('findAllUsers')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @GlobalRouteDecorator('findOneUser')
  findOne(@Payload() id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @GlobalRouteDecorator('findOneByEmailUser')
  findOneByEmail(@Payload() email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @GlobalRouteDecorator('updateUser')
  update(@Payload() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(updateUserDto);
  }

  @GlobalRouteDecorator('removeUser')
  remove(@Payload() id: number): Promise<DeleteResult> {
    return this.usersService.remove(id);
  }
}
