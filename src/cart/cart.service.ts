import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { ProductsService } from 'src/products/products.service';
import { Req } from 'request-interface';
import { CartDocument } from './cart.schema';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepo: CartRepository,
    private readonly productService: ProductsService,
  ) {}

  async getCartByUserId(userId: string): Promise<CartDocument> {
    const cart = await this.cartRepo.getCartByUserId(userId);
    if (!cart) throw new NotFoundException('No found cart!');
    return cart;
  }

  async addToCart(
    cartItem: { productId: string; quantity: number },
    { user }: Req,
  ): Promise<CartDocument> {
    const product = await this.productService.findProductByID(
      cartItem.productId,
    );
    if (!product)
      throw new NotFoundException('No product found with the provided ID!');
    const cart = await this.cartRepo.getCartByUserId(user.id);
    if (!cart) {
      return this.cartRepo.createCart(
        {
          product: product,
          quantity: cartItem.quantity,
        },
        user.id,
      );
    }
    const index = cart.cartItems.findIndex(
      (val) => val.product.id === cartItem.productId,
    );
    if (index !== -1) {
      cart.cartItems[index].quantity += cartItem.quantity;
      return await this.cartRepo.updateCartItems(cart.id, cart.cartItems);
    }
    cart.cartItems.push({
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
      },
      quantity: cartItem.quantity,
    });
    return cart.save();
  }
}
