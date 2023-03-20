import { Module } from '@nestjs/common';
import { FederalUnitsService } from './federal_units.service';
import { FederalUnitsController } from './federal_units.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FederalUnit } from './entities/federal_unit.entity';

@Module({
  imports:[TypeOrmModule.forFeature([FederalUnit])],
  controllers: [FederalUnitsController],
  providers: [FederalUnitsService]
})
export class FederalUnitsModule {}
