import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Req } from 'request-interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddToCartDTO } from './dtos/add-to-cart.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get('/my-cart')
  // async getMyCart(@Request() req: Req) {
  //   return this.usersService.getMyCart(req);
  // }

  // @Post('/cart')
  // async addToCart(@Body() cart: AddToCartDTO, @Request() req: Req) {
  //   return this.usersService.addToCart(cart);
  // }
}
