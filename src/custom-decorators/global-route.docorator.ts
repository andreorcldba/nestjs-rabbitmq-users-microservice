import {
  applyDecorators,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/parseResponseHttpException.filters';
import { MessagePattern } from '@nestjs/microservices';

export function GlobalRouteDecorator(event: string) {
  return applyDecorators(
    UseFilters(HttpExceptionFilter),
    UsePipes(new ValidationPipe({ whitelist: true, transform: true })),
    MessagePattern(event),
  );
}
