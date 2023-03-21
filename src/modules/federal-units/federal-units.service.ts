import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { responseHttpErrorMessage } from 'src/constants/http-responses';
import { responsePgErrorMessage } from 'src/constants/pg-responses';
import { Repository, UpdateResult } from 'typeorm';
import { CreateFederalUnitDto } from './dto/create-federal-unit.dto';
import { UpdateFederalUnitDto } from './dto/update-federal-unit.dto';
import { FederalUnit } from './entities/federal-unit.entity';

@Injectable()
export class FederalUnitsService {
  constructor(
    @InjectRepository(FederalUnit)
    private federalUnitRepository: Repository<FederalUnit>
  ) {}

  create(createFederalUnitDto: CreateFederalUnitDto): Promise<FederalUnit> {
    try {
      return this.federalUnitRepository.save(createFederalUnitDto);
    } catch (error) {
      console.log(error);

      throw new RpcException(responsePgErrorMessage[error?.code || 'unknown']);
    }
  }

  findAll(): Promise<FederalUnit[]> {
    return this.federalUnitRepository.find({
      relations: {
        cities: true
      }
    });
  }

  async findOne(id: number): Promise<FederalUnit> {
    const federal_unit = await this.federalUnitRepository.findOne({
      relations: {
        cities: true
      },
      where: {
        id
      }
    });

    if (!federal_unit) throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);

    return federal_unit;
  }

  async update(id: number, updateFederalUnitDto: UpdateFederalUnitDto): Promise<UpdateResult> {
    try {
      const federal_unit = await this.federalUnitRepository.update(id, updateFederalUnitDto);

      if (federal_unit.affected === 0) throw new RpcException(responseHttpErrorMessage[HttpStatus.NOT_FOUND]);

      return federal_unit;
    } catch (error) {
      console.log(error);
      throw new RpcException(responsePgErrorMessage[error?.code || 'unknown']);
    }
  }

  async remove(id: number) {
    const federal_unit = await this.findOne(id);

    return await this.federalUnitRepository.remove(federal_unit);
  }
}
