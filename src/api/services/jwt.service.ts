import { Request } from 'express';
import jwt from 'jsonwebtoken';

import logger from '../utils/logger';
import DateUtils from '../utils/dateUtils';
import { User } from '../entity/user';
import config from '../config';

export default class JwtService {
  makeJwt(user: User): string {
    const newUser = { ...user };
    delete newUser.password;
    return jwt.sign(newUser, config.hashJwt, {
      expiresIn: '12h',
    });
  }

  getUserByHeadertoken(request: Request): User {
    const token = this.getTokenByRequest(request);
    return token ? (this.verifyToken(token) as User) : null;
  }

  getUserByToken(token: string): User {
    return this.verifyToken(token) as User;
  }

  getTokenByRequest(request: Request): string {
    return request.headers.authorization ? request.headers.authorization : '';
  }

  isTokenExpired(token: string): boolean {
    try {
      const decodedToken = this.decodeToken(token);
      return this.getExpirationDiff(decodedToken) > 0;
    } catch (error) {
      logger.error(
        `Error during token expiration validation using token ${token}`,
      );
      return true;
    }
  }

  verifyToken(token: string): any {
    return token
      ? jwt.verify(token, config.hashJwt, function (err, decoded) {
          if (err) {
            return null;
          }
          return decoded;
        })
      : null;
  }

  private getExpirationDiff(decodedToken: any): number {
    return DateUtils.getDateTodayWithTimeZoneGMT().diff(
      decodedToken.exp * 1000,
    );
  }

  private decodeToken(token: string): any {
    return jwt.decode(token);
  }
}
