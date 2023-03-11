import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEmpty,
  IsEnum,
  IsOptional,
  IsNumber
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  city_id: number

  @IsOptional()
  @IsString()
  skills: string[]
}
