import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { responseHttpErrorMessage } from 'src/constants/http-responses';
import { responsePgErrorMessage } from 'src/constants/pg-responses';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    let user = await this.usersRepository.find({
      where: {
        status: true,
      },
    });

    user = user.map((v) => {
      delete v.remember_token;
      delete v.password;

      return v;
    });

    if (!user.length)
      throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);

    return user;
  }

  async findOne(id: number): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
        status: true,
      },
    });

    delete user?.remember_token;
    delete user?.password;

    if (!user)
      throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    try {
      const user = await this.usersRepository.save({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 8),
      });

      delete user.remember_token;
      delete user.password;

      return user;
    } catch (error) {
      throw new RpcException(responsePgErrorMessage[error?.code || 'unknown']);
    }
  }

  async update(
    updateUserDto: UpdateUserDto, //: Promise<Users>
  ) {
    try {
      const { id } = updateUserDto;

      delete updateUserDto.id;

      if (updateUserDto?.password)
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 8);

      const user = await this.usersRepository.update({ id }, updateUserDto);

      return user;
    } catch (error) {
      console.log(error);
      throw new RpcException(responsePgErrorMessage[error?.code || 'unknown']);
    }
  }

  remove(id: number) {
    const updateUserDto = new UpdateUserDto();
    updateUserDto.id = id;
    updateUserDto.status = false;
    try {
      const user = this.usersRepository.update(id, updateUserDto);

      return user;
    } catch (error) {
      console.log(error);

      return responsePgErrorMessage[error?.code || 'unknown'];
    }
  }
}
