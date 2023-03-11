import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IhealthCheck } from './interfaces/app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck(): IhealthCheck {
    return this.appService.healthCheck();
  }
}
