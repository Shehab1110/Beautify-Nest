import {
  ExecutionContext,
  CanActivate,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('Please login to get access!');
    try {
      const { userId } = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.usersRepository.findUserById(userId);
      if (!user)
        throw new UnauthorizedException(
          'The user of this token does not exist anymore!',
        );
      request['user'] = user;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Malformed JWT!');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
