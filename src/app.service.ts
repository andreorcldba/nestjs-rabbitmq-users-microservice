import { Injectable } from '@nestjs/common';
import { IhealthCheck } from './interfaces/app.interface';

@Injectable()
export class AppService {
  healthCheck(): IhealthCheck {
    return {
      name: 'user microservice',
      status: true
    };
  }
}
