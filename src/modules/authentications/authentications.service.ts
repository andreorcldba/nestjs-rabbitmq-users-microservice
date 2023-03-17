import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/users.entity';
import { AuthenticationDto } from './dto/authentication.dto';
import * as bcrypt from 'bcrypt';
import { responseHttpErrorMessage } from 'src/constants/http-responses';

@Injectable()
export class AuthenticationsService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async authenticate(authenticationDto: AuthenticationDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email: authenticationDto.email,
        status: true,
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
