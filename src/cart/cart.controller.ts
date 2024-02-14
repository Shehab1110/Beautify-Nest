import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dtos/add-to-cart.dto';
import { Req } from '../../request-interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/user.schema';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/my-cart')
  async getCartByUserId(@Request() { user }: Req) {
    return this.cartService.getCartByUserId(user.id);
  }

  @Post()
  async addToMyCart(@Body() cartItem: AddToCartDto, @Request() req: Req) {
    console.log('Adding to cart!');
    return this.cartService.addToCart(cartItem, req);
  }
}
