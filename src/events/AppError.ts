import { Request, Response, NextFunction } from 'express';

import AppLog from './AppLog';
import AppError from './../config/error';

function ExceptionHandler(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { type, message } = error;

  AppLog(type, message);

  if (type === "unauthorized") {
    return res.status(401).send({
      message: message,
    });
  }
  if (type === "conflict") {
    return res.status(409).send({
      message: message,
    });
  }
  if (type === "not_found") {
    return res.status(404).send({
      message: message,

    });
  }
  if (type === "bad_request") {
    return res.status(400).send({
      message: message,

    });
  }

  return res.status(500).send({
    message: message,
    detail: error,
  });
}

export { AppError };
export default ExceptionHandler;
