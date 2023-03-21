import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { GlobalRouteDecorator } from 'src/decorators/global-route.docorator';
import { IResponseHttpError } from 'src/interfaces/http-response.interface';
import { User } from '../users/entities/users.entity';
import { AuthenticationsService } from './authentications.service';
import { AuthenticationDto } from './dto/authentication.dto';

@Controller()
export class AuthenticationsController {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
  ) {}

  @GlobalRouteDecorator('logIn')
  async logIn(
    @Payload() authenticationDto: AuthenticationDto,
  ): Promise<User | IResponseHttpError> {
    return this.authenticationsService.authenticate(authenticationDto);
  }
}
