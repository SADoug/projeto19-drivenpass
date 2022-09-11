import { Request, Response, NextFunction } from 'express';

import AppLog from './AppLog';
import AppError from './../config/error';

function ExceptionHandler(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { type, statusCode, message, detail } = error;

  AppLog(type, message);
  return error instanceof AppError
    ? res.status(statusCode).send({ message, detail })
    : res.status(500).send({
        message: `Internal server error`,
        detail: error,
      });
}

export { AppError };
export default ExceptionHandler;
