import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { FederalUnit } from '../federal-units/entities/federal-unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, FederalUnit])],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
