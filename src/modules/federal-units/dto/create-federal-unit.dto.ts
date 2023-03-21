import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateFederalUnitDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  acronym: string;
}
