import { Response } from "express";

interface types {
  unauthorized: number,
  conflict: number,
  not_found: number,
  bad_request: number
}


const ERRORS = {
  unauthorized: 401,
  conflict: 409,
  not_found: 404,
  bad_request: 400
}

export default function errorHandlerMiddleware(err: any, res: Response) {
  console.log(err);
  const type: types = err.type;
  let statusCode: number = ERRORS[type];
  if(!statusCode) statusCode = 500; // any other types

  return res.sendStatus(statusCode); // internal server error
}
