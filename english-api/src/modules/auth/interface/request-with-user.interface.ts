import { Request } from 'express';
import { UserResponse } from 'src/modules/user/response/user.response';

interface RequestWithUser extends Request {
  user: UserResponse;
}

export default RequestWithUser;
