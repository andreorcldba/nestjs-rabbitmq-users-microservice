import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { responsePgErrorMessage } from 'src/constants/pg-responses';
import { GlobalRouteDecorator } from 'src/custom-decorators/global-route.docorator';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller()
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @GlobalRouteDecorator('createCity')
  create(@Payload() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @GlobalRouteDecorator('findAllCities')
  findAll() {
    return this.citiesService.findAll();
  }

  @GlobalRouteDecorator('findOneCity')
  findOne(@Payload() id: number) {
    return this.citiesService.findOne(id);
  }

  @GlobalRouteDecorator('updateCity')
  update(@Payload() updateCityDto: UpdateCityDto) {
    return this.citiesService.update(updateCityDto);
  }

  @GlobalRouteDecorator('removeCity')
  remove(@Payload() id: number) {
    return this.citiesService.remove(id);
  }
}
