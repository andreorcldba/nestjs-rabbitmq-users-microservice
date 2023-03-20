import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { responseHttpErrorMessage } from 'src/constants/http-responses';
import { responsePgErrorMessage } from 'src/constants/pg-responses';
import { Repository } from 'typeorm';
import { CreateFederalUnitDto } from './dto/create-federal_unit.dto';
import { UpdateFederalUnitDto } from './dto/update-federal_unit.dto';
import { FederalUnit } from './entities/federal_unit.entity';

@Injectable()
export class FederalUnitsService {
  constructor(
    @InjectRepository(FederalUnit)
    private federalUnitRepository: Repository<FederalUnit>,
  ) {}

  async create(createFederalUnitDto: CreateFederalUnitDto) {
    try {
      return await this.federalUnitRepository.save(createFederalUnitDto);
    } catch (error) {
      throw new RpcException(responsePgErrorMessage[error?.code || 'unknown']);
    }
  }

  async findAll() {
    let federal_unit = await this.federalUnitRepository.find({
      relations: {
        cities: true,
      },
    });

    if (!federal_unit.length)
      throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);

    return federal_unit;
  }

  async findOne(id: number) {
    const federal_unit = await this.federalUnitRepository.findOne({
      relations: {
        cities: true,
      },
      where: {
        id,
      },
    });

    if (!federal_unit)
      throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);

    return federal_unit;
  }

  async update(id: number, updateFederalUnitDto: UpdateFederalUnitDto) {
    try {
      const federal_unit = await this.findOne(updateFederalUnitDto.id);

      await this.federalUnitRepository.save({
        ...federal_unit,
        ...updateFederalUnitDto,
      });

      return federal_unit;
    } catch (error) {
      throw new RpcException(responsePgErrorMessage[error?.code || 'unknown']);
    }
  }

  async remove(id: number) {
    try {
      const federal_unit = await this.findOne(id);

      await this.federalUnitRepository.remove(federal_unit);

      return federal_unit;
    } catch (error) {
      throw new RpcException(responsePgErrorMessage[error?.code || 'unknown']);
    }
  }
}
