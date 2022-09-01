import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Message from '../config/messages';
import JwtService from '../services/jwt.service';
import config from '../config';

const jwtService = new JwtService();

export default function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = jwtService.getTokenByRequest(req);
    if (!token) {
      return res.status(401).json({ message: Message.JWT_MALFORMED });
    }

    jwt.verify(token, config.hashJwt, function (err, decoded) {
      if (err) return res.status(401).json({ message: Message.JWT_MALFORMED });
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: Message.JWT_MALFORMED });
  }
}
