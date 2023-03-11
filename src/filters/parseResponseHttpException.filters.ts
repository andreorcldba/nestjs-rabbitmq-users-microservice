import { ExceptionFilter, Catch, HttpException } from '@nestjs/common';
import { responsePgErrorMessage } from 'src/constants/pg-responses';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const resException: any = exception.getResponse();

    if (resException?.statusCode) return resException;

    return responsePgErrorMessage['unknown'];
  }
}
