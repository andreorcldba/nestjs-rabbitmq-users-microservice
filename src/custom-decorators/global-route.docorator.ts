import {
  applyDecorators,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/parseResponseHttpException.filters';
import { MessagePattern } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

export function GlobalRouteDecorator(event: string) {
  const configService = new ConfigService();

  return applyDecorators(
    UseFilters(HttpExceptionFilter),
    UsePipes(new ValidationPipe({ whitelist: true, transform: true })),
    MessagePattern({
      eventName: event,
      token: configService.get('USER_MICROSERVICE_TOKEN'),
    }),
  );
}
