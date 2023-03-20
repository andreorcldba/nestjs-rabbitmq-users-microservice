import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateFederalUnitDto } from './create-federal_unit.dto';

export class UpdateFederalUnitDto extends PartialType(CreateFederalUnitDto) {
  @IsNotEmpty()
  id: number;
}
