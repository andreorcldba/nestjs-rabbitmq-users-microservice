import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
  IsEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsEmpty()
  id: number;

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
