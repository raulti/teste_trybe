import { Database } from '../config/database';
import { User } from '../entity/user';

export default class UserRepository {
  user = Database.manager.connection.getRepository(User);

  save(user: User): Promise<User> {
    return this.user.save(user);
  }

  findByEmail(emailData: string): Promise<User> {
    return this.user.findOne({ where: { email: emailData } });
  }

  findByEmailAndPassoword(
    emailData: string,
    passwordData: string,
  ): Promise<User> {
    return this.user.findOne({
      where: { email: emailData, password: passwordData },
    });
  }
}
