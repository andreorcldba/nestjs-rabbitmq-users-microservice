import { HttpStatus } from '@nestjs/common';
import { ResponseMessage } from 'src/interfaces/http-response.interface';
import { responseHttpErrorMessage } from './http-responses';

export const responsePgErrorMessage: ResponseMessage = {
  23505: {
    ...responseHttpErrorMessage[HttpStatus.BAD_REQUEST],
    message: ['Resource already exists'],
  },
  23503: {
    ...responseHttpErrorMessage[HttpStatus.BAD_REQUEST],
    message: ['Invalid relation'],
  },
  unknown: responseHttpErrorMessage[HttpStatus.INTERNAL_SERVER_ERROR],
};
