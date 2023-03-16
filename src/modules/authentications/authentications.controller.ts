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
    return await this.authenticationsService.authenticate(
      authenticationDto,
    );
    //const user = await this.userRepository.findOne({ email: email });
    //console.log(createAuthenticationDto)
    // if (user) {
    //     const isPasswordMatching = await bcrypt.compare(password, user.password);

    //     if (!isPasswordMatching) {
    //         throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    //     }

    //     return user;
    // }
    // throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    return {};
  }
}
