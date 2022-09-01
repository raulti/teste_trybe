import Message from '../config/messages';
import BusinessException from '../exeptions/BusinessException';
import { LoginRequest } from '../models/user.model';
import UserRepository from '../repositories/user.repository';
import JwtService from './jwt.service';

export default class LoginService {
  userRepository = new UserRepository();

  jwtService = new JwtService();

  async login(loginRequest: LoginRequest): Promise<string> {
    if (!loginRequest.email || !loginRequest.password) {
      throw new BusinessException(401, Message.ALL_FIELDS_FILLED);
    }

    const user = await this.userRepository.findByEmailAndPassoword(
      loginRequest.email,
      loginRequest.password,
    );
    if (!user) {
      throw new BusinessException(401, Message.INCORRECT_LOGIN);
    }
    return this.jwtService.makeJwt(user);
  }
}
