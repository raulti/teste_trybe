import { NextFunction, Request, Response } from 'express';
import HttpException from '../exeptions/HttpException';

export default function ErrorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const status = error.status || 500;
  const message = error.message || 'Invalid emtroes. Try agin.';

  response.status(status).send({
    message,
  });
}
