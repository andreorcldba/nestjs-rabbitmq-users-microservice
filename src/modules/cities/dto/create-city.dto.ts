import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  acronym: string;

  @IsNotEmpty()
  @IsNumber()
  federalUnitId: number;
}
