import { NextFunction, Request, Response } from "express";

interface ERRORS {
  unauthorized: number,
  conflict: number,
  not_found: number,
  bad_request: number
}


const ERRORS: ERRORS = {
  unauthorized: 401,
  conflict: 409,
  not_found: 404,
  bad_request: 400
}

export default function errorHandlerMiddleware(err: any, res: Response) {
  console.log(err);
  const type: string = err.type;
  let statusCode = ERRORS[type];
  if(!statusCode) statusCode = 500; // any other types

  return res.sendStatus(statusCode); // internal server error
}
