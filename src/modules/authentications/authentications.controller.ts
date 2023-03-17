import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { GlobalRouteDecorator } from 'src/custom-decorators/global-route.docorator';
import { AuthenticationsService } from './authentications.service';
import { AuthenticationDto } from './dto/authentication.dto';

@Controller()
export class AuthenticationsController {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
  ) {}

  @GlobalRouteDecorator('log-in')
  async logIn(@Payload() authenticationDto: AuthenticationDto) {
    return await this.authenticationsService.authenticate(authenticationDto);
  }
}
