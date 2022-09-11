import { Response } from "express";

import { errorTypeToStatusCode, isAppError } from "../utils/errorUtils.js";

export default function handleErrorsMiddleware(err: any, res: Response) {
  console.log("Ooops! An error occured!", err);

  if (isAppError(err)) {
    const statusCode = errorTypeToStatusCode(err.type);
    return res.status(statusCode).send(err.message)
  }

 return res.sendStatus(500);
}
