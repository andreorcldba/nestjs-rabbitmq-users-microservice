import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { responsePgErrorMessage } from 'src/constants/pg-responses';
import { PgErrorResponseMessage } from 'src/interfaces/pg-error-response.interface';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  findAll() {
    return `This action returns all users in microservice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user in microservice`;
  }

  async save(
    updateOrCreateUserDto: UpdateUserDto | CreateUserDto,
  ): Promise<Users | PgErrorResponseMessage> {
    try {
      const user = new Users(updateOrCreateUserDto);

      return await this.usersRepository.save(user);
    } catch (error) {
      console.log(error);

      return responsePgErrorMessage[error?.code || 'unknown'];
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user in microservice`;
  }
}
