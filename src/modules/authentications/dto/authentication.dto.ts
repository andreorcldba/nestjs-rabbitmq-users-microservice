import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AuthenticationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
