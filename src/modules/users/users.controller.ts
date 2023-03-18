import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GlobalRouteDecorator } from 'src/custom-decorators/global-route.docorator';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GlobalRouteDecorator('create')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @GlobalRouteDecorator('findAll')
  findAll() {
    return this.usersService.findAll();
  }

  @GlobalRouteDecorator('findOne')
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @GlobalRouteDecorator('findOneByEmail')
  findOneByEmail(@Payload() email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @GlobalRouteDecorator('update')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @GlobalRouteDecorator('remove')
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}
