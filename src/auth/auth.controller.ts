import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user-dto';
import { AuthService, AuthenticatedUser } from './auth.service';
import { SignInUserDto } from 'src/users/dtos/signin-user-dto';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from './auth.guard';
import { Roles } from 'roles.decorator';

interface Req extends ExpressRequest {
  user: any;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() user: CreateUserDto): Promise<object> {
    return this.authService.signUp(user);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() user: SignInUserDto): Promise<AuthenticatedUser> {
    return this.authService.signIn(user);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: Req) {
    return req.user;
  }
}
