import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { responseHttpErrorMessage } from 'src/constants/http-responses';
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

  async findAll(): Promise<Users[] | PgErrorResponseMessage> {
    const user = await this.usersRepository.find();

    if (!user.length) return responseHttpErrorMessage[HttpStatus.NOT_FOUND];

    return user;
  }

  async findOne(id: number): Promise<Users | PgErrorResponseMessage> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) return responseHttpErrorMessage[HttpStatus.NOT_FOUND];

    return user;
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
