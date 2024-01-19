import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(user: Partial<User>): Promise<UserDocument> {
    return this.userModel.create(user);
  }

  async findUserByEmail(
    email: string,
    selectOpts?: string[],
  ): Promise<UserDocument | null> {
    const selectOptsStr = selectOpts
      ?.map((val) => {
        return (val = `+${val}`);
      })
      .join(' ');
    return this.userModel.findOne({ email }).select(selectOptsStr);
  }

  async findUserById(
    id: string,
    selectOpts?: string[],
  ): Promise<UserDocument | null> {
    const selectOptsStr = selectOpts
      ?.map((val) => {
        return (val = `+${val}`);
      })
      .join(' ');
    return this.userModel.findById(id, selectOptsStr);
  }
}
