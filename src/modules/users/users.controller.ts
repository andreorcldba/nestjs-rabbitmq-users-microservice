import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GlobalRouteDecorator } from 'src/decorators/global-route.docorator';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GlobalRouteDecorator('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @GlobalRouteDecorator('findAllUsers')
  findAll() {
    return this.usersService.findAll();
  }

  @GlobalRouteDecorator('findOneUser')
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @GlobalRouteDecorator('findOneByEmailUser')
  findOneByEmail(@Payload() email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @GlobalRouteDecorator('updateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @GlobalRouteDecorator('removeUser')
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}
