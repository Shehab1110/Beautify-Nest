import { Request } from 'express';
import { User } from 'src/users/user.schema';

export interface Req extends Request {
  user: User;
}
