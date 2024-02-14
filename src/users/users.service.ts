import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User, UserDocument } from './user.schema';
import { Req } from 'request-interface';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(user: Partial<User>): Promise<UserDocument> {
    return this.userRepository.createUser(user);
  }

  // async getMyCart(req: Req): Promise<CartItems> {
  //   return req.user.cartItems;
  // }

  // async addToCart(
  //   cartItem: { product: string; quantity: number },
  //   req: Req,
  // ): Promise<CartItems> {
  //   const productDoc = await this.productService.findProductByID(
  //     cartItem.product,
  //   );
  //   if (!productDoc)
  //     throw new NotFoundException('No found product with the provided ID!');
  //   const product = {
  //     product: {
  //       id: productDoc.id,
  //       name: productDoc.name,
  //       price: productDoc.price,
  //     },
  //     quantity: cartItem.quantity,
  //   };
  //   return req.user.AddToMyCart(product);
  // }
}
