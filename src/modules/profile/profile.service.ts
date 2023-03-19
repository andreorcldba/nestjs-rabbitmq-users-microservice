import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { responseHttpErrorMessage } from 'src/constants/http-responses';
import { responsePgErrorMessage } from 'src/constants/pg-responses';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    try {
      return await this.profileRepository.save(createProfileDto);
    } catch (error) {
      throw new RpcException(responsePgErrorMessage[error?.code || 'unknown']);
    }
  }

  async findAll(): Promise<Profile[]> {
    let profile = await this.profileRepository.find();

    if (!profile.length)
      throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);

    return profile;
  }

  async findOne(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: {
        id,
      },
    });

    if (!profile)
      throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);

    return profile;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const { id } = updateProfileDto;

      delete updateProfileDto.id;

      const user = await this.profileRepository.update(
        { id },
        updateProfileDto,
      );

      return user;
    } catch (error) {
      console.log(error);
      throw new RpcException(responsePgErrorMessage[error?.code || 'unknown']);
    }
  }

  async remove(id: number) {
    try {
      const profile = await this.profileRepository.delete({ id });

      if (profile.affected === 0)
        throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);
    } catch (error) {
      console.log(error);

      return responsePgErrorMessage[error?.code || 'unknown'];
    }
  }
}
