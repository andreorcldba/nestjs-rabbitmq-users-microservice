import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
  IsBoolean,
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
  @IsBoolean()
  status: boolean;
}
