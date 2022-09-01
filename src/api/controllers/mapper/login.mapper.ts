import { LoginRequest } from 'api/models/user.model';
import { Builder } from 'builder-pattern';
import { Request } from 'express';

class UserMapper {
  loginRequestFromRequest(req: Request) {
    return Builder<LoginRequest>(req.body).build();
  }

  reponseJwtToken(tokenData: string) {
    return { token: tokenData };
  }
}
export default new UserMapper();
