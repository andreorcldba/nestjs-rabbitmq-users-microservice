import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { responseHttpErrorMessage } from 'src/constants/http-responses';
import { responsePgErrorMessage } from 'src/constants/pg-responses';
import { Repository } from 'typeorm';
import { FederalUnit } from '../federal_units/entities/federal_unit.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(FederalUnit)
    private federalRepository: Repository<FederalUnit>,
  ) {}

  async create(createCityDto: CreateCityDto) {
    try {
      return await this.cityRepository.save(createCityDto);
    } catch (error) {
      console.log(error);
      throw new RpcException(responsePgErrorMessage[error?.code || 'unknown']);
    }
  }

  async findAll() {
    let cities = await this.cityRepository.find({
      relations: {
        federalUnit: true,
      },
    });

    if (!cities.length)
      throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);

    return cities;
  }

  async findOne(id: number) {
    const city = await this.cityRepository.findOne({
      relations: {
        federalUnit: true,
      },
      where: {
        id,
      },
    });

    if (!city)
      throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);

    return city;
  }

  async update(updateCityDto: UpdateCityDto) {
    const { id } = updateCityDto;
    delete updateCityDto.id;

    let city = null;

    try {
      city = await this.cityRepository.update(
        {
          id,
        },
        {
          ...updateCityDto,
        },
      );
    } catch (error) {
      console.log(error);
      throw new RpcException(responsePgErrorMessage[error?.code || 'unknown']);
    }

    if (city.affected === 0)
      throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);

    return city;
  }

  async remove(id: number) {
    const city = await this.findOne(id);

    await this.cityRepository.remove(city);

    return city;
  }
}
