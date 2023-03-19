import {
  applyDecorators,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from 'src/filters/global.filter';

export function GlobalRouteDecorator(event: string) {
  const configService = new ConfigService();

  return applyDecorators(
    UseFilters(GlobalExceptionFilter),
    UsePipes(new ValidationPipe({ whitelist: true, transform: true })),
    MessagePattern({
      eventName: event,
      token: configService.get('USER_MICROSERVICE_TOKEN'),
    }),
  );
}
