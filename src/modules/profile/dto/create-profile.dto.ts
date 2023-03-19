import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
