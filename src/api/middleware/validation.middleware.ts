import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export default function ValidationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const validation = validationResult(request);
  if (!validation.isEmpty()) {
    response
      .status(400)
      .json({ message: validationResult(request).array()[0].msg });
  } else {
    next();
  }
}
