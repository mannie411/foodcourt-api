import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

import {
  ValidationError,
  NotFoundError,
  DBError,
  ConstraintViolationError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError,
} from 'objection';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof ValidationError) {
      switch (exception.type) {
        case 'ModelValidation':
          response.status(HttpStatus.BAD_REQUEST).send({
            message: exception.message,
            error: exception.type,
            data: exception.data,
            statusCode: HttpStatus.BAD_REQUEST,
          });
          break;
        case 'RelationExpression':
          response.status(HttpStatus.BAD_REQUEST).send({
            message: exception.message,
            error: 'RelationExpression',
            data: {},
            statusCode: HttpStatus.BAD_REQUEST,
          });
          break;
        case 'UnallowedRelation':
          response.status(HttpStatus.BAD_REQUEST).send({
            message: exception.message,
            error: exception.type,
            data: {},
            statusCode: HttpStatus.BAD_REQUEST,
          });
          break;
        case 'InvalidGraph':
          response.status(HttpStatus.BAD_REQUEST).send({
            message: exception.message,
            error: exception.type,
            data: {},
            statusCode: HttpStatus.BAD_REQUEST,
          });
          break;
        default:
          response.status(HttpStatus.BAD_REQUEST).send({
            message: exception.message,
            error: 'UnknownValidationError',
            data: {},
            statusCode: HttpStatus.BAD_REQUEST,
          });
          break;
      }
    } else if (exception instanceof ConstraintViolationError) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
        error: 'ConstraintViolation',
      });
    } else if (exception instanceof DBError) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
        error: 'UnknownDBError',
      });
    } else if (exception instanceof DataError) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
        error: 'InvalidData',
      });
    } else if (exception instanceof CheckViolationError) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
        error: 'CheckViolation',
      });
    } else if (exception instanceof ForeignKeyViolationError) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
        error: 'ForeignKeyViolation',
      });
    } else if (exception instanceof NotNullViolationError) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
        error: 'NotNullViolation',
      });
    } else if (exception instanceof UniqueViolationError) {
      response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: exception.message,
        error: 'UniqueViolation',
      });
    } else if (exception instanceof NotFoundError) {
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: exception.message,
        error: 'NotFound',
      });
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).send(exception.getResponse());
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'UnknownErrorServer',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
