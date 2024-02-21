import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dtos/add-to-cart.dto';
import { Req } from '../../request-interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/user.decorator';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/my-cart')
  async getCartByUserId(@User('id') id: string) {
    return this.cartService.getCartByUserId(id);
  }

  @Post()
  async addToMyCart(@Body() cartItem: AddToCartDto, @User('id') id: string) {
    return this.cartService.addToCart(cartItem, id);
  }

  @Delete()
  async deleteCart(@User('id') id: string) {
    console.log(id);
    return this.cartService.deleteCartByUserId(id);
  }
}
