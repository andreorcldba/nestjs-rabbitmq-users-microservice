import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { AuthenticationDto } from './dto/authentication.dto';
import * as bcrypt from 'bcrypt';
import { responseHttpErrorMessage } from 'src/constants/http-responses';
import {
  IResponseHttpError,
  IResponseMessage,
} from 'src/interfaces/http-response.interface';

@Injectable()
export class AuthenticationsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async authenticate(
    authenticationDto: AuthenticationDto,
  ): Promise<User | IResponseHttpError> {
    const user = await this.usersRepository.findOne({
      where: {
        email: authenticationDto.email,
      },
    });

    if (!user) return responseHttpErrorMessage[HttpStatus.NOT_FOUND];

    const isPasswordMatching = await bcrypt.compare(
      authenticationDto.password,
      user.password,
    );

    if (!isPasswordMatching)
      return responseHttpErrorMessage[HttpStatus.UNAUTHORIZED];

    return user;
  }
}
