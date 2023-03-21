import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { GlobalRouteDecorator } from 'src/decorators/global-route.docorator';
import { CreateFederalUnitDto } from './dto/create-federal-unit.dto';
import { UpdateFederalUnitDto } from './dto/update-federal-unit.dto';
import { FederalUnitsService } from './federal-units.service';

@Controller()
export class FederalUnitsController {
  constructor(private readonly federalUnitsService: FederalUnitsService) {}

  @GlobalRouteDecorator('createFederalUnit')
  async create(@Payload() createFederalUnitDto: CreateFederalUnitDto) {
    return await this.federalUnitsService.create(createFederalUnitDto);
  }

  @GlobalRouteDecorator('findAllFederalUnits')
  async findAll() {
    return await this.federalUnitsService.findAll();
  }

  @GlobalRouteDecorator('findOneFederalUnit')
  async findOne(@Payload() id: number) {
    return await this.federalUnitsService.findOne(id);
  }

  @GlobalRouteDecorator('updateFederalUnit')
  async update(@Payload() updateFederalUnitDto: UpdateFederalUnitDto) {
    return await this.federalUnitsService.update(
      updateFederalUnitDto.id,
      updateFederalUnitDto,
    );
  }

  @GlobalRouteDecorator('removeFederalUnit')
  async remove(@Payload() id: number) {
    return await this.federalUnitsService.remove(id);
  }
}
