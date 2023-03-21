import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { responseHttpErrorMessage } from 'src/constants/http-responses';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import { RpcException } from '@nestjs/microservices';
import { Profile } from '../profile/entities/profile.entity';
import { responsePgErrorMessage } from 'src/constants/pg-responses';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        profile: true
      }
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      relations: {
        profile: true
      },
      where: {
        id
      }
    });

    if (!user) throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        email
      }
    });

    if (!user) throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.save({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 8)
      });

      delete user.password;

      return user;
    } catch (error) {
      console.log(error);
      throw new RpcException(responsePgErrorMessage[error?.code || 'unknown']);
    }
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(updateUserDto.id);

      if (updateUserDto?.password) {
        user.password = await bcrypt.hash(updateUserDto.password, 8);
      }

      if (updateUserDto?.profile) {
        user.profile = {
          ...user.profile,
          ...updateUserDto.profile
        };
      }

      return await this.usersRepository.save({ ...user, ...updateUserDto });
    } catch (error) {
      console.log(error);
      throw new RpcException(responsePgErrorMessage[error?.code || 'unknown']);
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    await this.profileRepository.delete({ id: user.profile.id });

    return {};
  }
}
