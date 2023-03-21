import { HttpStatus } from '@nestjs/common';
import { IResponseMessage } from 'src/interfaces/http-response.interface';
import { responseHttpErrorMessage } from './http-responses';

export const responsePgErrorMessage: IResponseMessage = {
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
