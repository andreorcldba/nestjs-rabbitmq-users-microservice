import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FederalUnit } from './entities/federal-unit.entity';
import { FederalUnitsController } from './federal-units.controller';
import { FederalUnitsService } from './federal-units.service';

@Module({
  imports: [TypeOrmModule.forFeature([FederalUnit])],
  controllers: [FederalUnitsController],
  providers: [FederalUnitsService],
})
export class FederalUnitsModule {}
