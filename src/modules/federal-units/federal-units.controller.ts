import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { GlobalRouteDecorator } from 'src/decorators/global-route.docorator';
import { UpdateResult } from 'typeorm';
import { CreateFederalUnitDto } from './dto/create-federal-unit.dto';
import { UpdateFederalUnitDto } from './dto/update-federal-unit.dto';
import { FederalUnit } from './entities/federal-unit.entity';
import { FederalUnitsService } from './federal-units.service';

@Controller()
export class FederalUnitsController {
  constructor(private readonly federalUnitsService: FederalUnitsService) {}

  @GlobalRouteDecorator('createFederalUnit')
  create(@Payload() createFederalUnitDto: CreateFederalUnitDto): Promise<FederalUnit> {
    return this.federalUnitsService.create(createFederalUnitDto);
  }

  @GlobalRouteDecorator('findAllFederalUnits')
  findAll(): Promise<FederalUnit[]> {
    return this.federalUnitsService.findAll();
  }

  @GlobalRouteDecorator('findOneFederalUnit')
  findOne(@Payload() id: number): Promise<FederalUnit> {
    return this.federalUnitsService.findOne(id);
  }

  @GlobalRouteDecorator('updateFederalUnit')
  update(@Payload() updateFederalUnitDto: UpdateFederalUnitDto): Promise<UpdateResult> {
    return this.federalUnitsService.update(updateFederalUnitDto.id, updateFederalUnitDto);
  }

  @GlobalRouteDecorator('removeFederalUnit')
  remove(@Payload() id: number) {
    return this.federalUnitsService.remove(id);
  }
}
