import { Builder } from 'builder-pattern';
import { Request } from 'express';
import { User } from '../../entity/user';
import RoleEnum from '../../models/enum/role.enum';

class UserMapper {
  userFromRequest(req: Request) {
    return Builder<User>(req.body).role(RoleEnum.USER).build();
  }

  userAdminFromRequest(req: Request) {
    return Builder<User>(req.body).role(RoleEnum.ADMIN).build();
  }

  userResponse(userData: User) {
    delete userData.password;
    return { user: userData };
  }
}
export default new UserMapper();
