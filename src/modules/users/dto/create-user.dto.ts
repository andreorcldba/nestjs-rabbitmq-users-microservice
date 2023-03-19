import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsEmpty,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { CreateProfileDto } from 'src/modules/profile/dto/create-profile.dto';

export class CreateUserDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile: CreateProfileDto;
}
