import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async signUp(user: Partial<User>): Promise<UserDocument> {
    const newUser = this.userRepository.createUser(user);
    return newUser;
  }

  async signIn(user: Partial<User>): Promise<UserDocument> {
    const foundUser = await this.userRepository.findUserByEmail(user.email);
    if (!foundUser || !(await foundUser.checkPassword(user.password)))
      throw new UnauthorizedException('Incorrect email or Password!');
    return foundUser;
  }
}
