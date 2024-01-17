import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UserDocument } from './user.schema';
import { SignInUserDto } from './dtos/signin-user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async signUp(@Body() user: CreateUserDto): Promise<UserDocument> {
    return this.usersService.signUp(user);
  }

  @Post('/signin')
  @HttpCode(200)
  async signin(@Body() user: SignInUserDto): Promise<UserDocument> {
    return this.usersService.signIn(user);
  }
}
