import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { responseHttpErrorMessage } from 'src/constants/http-responses';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { Profile } from '../profile/entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async findAll(): Promise<Users[]> {
    let user = await this.usersRepository.find({
      relations: {
        profile: true,
      },
    });

    user = user.map((v) => {
      delete v.password;

      return v;
    });

    if (!user.length)
      throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);

    return user;
  }

  async findOne(id: number): Promise<Users> {
    const user = await this.usersRepository.findOne({
      relations: {
        profile: true,
      },
      where: {
        id,
      },
    });

    if (!user)
      throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);

    return user;
  }

  async findOneByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user)
      throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const user = await this.usersRepository.save({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 8),
    });

    delete user.password;

    return user;
  }

  async update(
    updateUserDto: UpdateUserDto, //: Promise<Users>
  ) {
    if (updateUserDto?.password)
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 8);

    const user = await this.findOne(updateUserDto.id);

    await this.usersRepository.save({
      ...user,
      ...updateUserDto,
      password: await bcrypt.hash(updateUserDto.password, 8),
    });

    delete user.password;

    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    await this.usersRepository.remove(user);
    await this.profileRepository.remove(user.profile);

    return user;
  }
}
