import Message from '../config/messages';
import { User } from '../entity/user';
import BusinessException from '../exeptions/BusinessException';
import UserRepository from '../repositories/user.repository';

export default class UserService {
  userRepository = new UserRepository();

  async save(user: User): Promise<User> {
    const savedUser = await this.findByEmail(user.email);
    if (savedUser) {
      throw new BusinessException(409, Message.EMAIL_REGISTERED);
    }
    return this.userRepository.save(user);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }
}
