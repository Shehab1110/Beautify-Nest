import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument, CartItem } from './cart.schema';

export class CartRepository {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
  ) {}

  async getCartByUserId(userId: string) {
    const cart = await this.cartModel.findOne({ user: userId });
    return cart;
  }

  async createCart(cartItem: CartItem, userId: string): Promise<CartDocument> {
    const cartItems = [
      {
        product: {
          id: cartItem.product.id,
          name: cartItem.product.name,
          price: cartItem.product.price,
        },
        quantity: cartItem.quantity,
      },
    ];
    return this.cartModel.create({
      user: userId,
      cartItems,
    });
  }

  async updateCartItems(
    cartId: string,
    cartItems: Array<CartItem>,
  ): Promise<CartDocument> {
    return this.cartModel
      .findByIdAndUpdate(cartId, { cartItems }, { new: true })
      .lean();
  }
  // async updateCartItems(
  //   cart: CartDocument,
  //   cartItem: CartItems,
  // ): Promise<CartDocument> {
  //   const index = cart.cartItems.findIndex(
  //     (val) => val.product.toString() === cartItem.product,
  //   );
  //   console.log(index);
  //   if (index !== -1) {
  //     cart.cartItems[index].quantity += cartItem.quantity;
  //     return cart.save();
  //   }
  //   const item = {
  //     product: new mongoose.Types.ObjectId(cartItem.product),
  //     quantity: cartItem.quantity,
  //   };
  //   cart.cartItems.push(item);
  //   return cart.save();
  // }
}
