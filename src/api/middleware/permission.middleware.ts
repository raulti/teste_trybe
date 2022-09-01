import { NextFunction, Request, Response } from 'express';
import Message from '../config/messages';
import JwtService from '../services/jwt.service';

const jwtService = new JwtService();

export default function Permission(...permissionRequired) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (isValidPermission(request, permissionRequired)) {
      next();
    } else {
      response.status(403).json({ message: Message.ONLY_ADMINS });
    }
  };
}

function isValidPermission(request, permissionRequired) {
  return jwtService.getUserByHeadertoken(request).role == permissionRequired;
}
