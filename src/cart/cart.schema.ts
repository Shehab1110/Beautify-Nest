import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from 'src/products/product.schema';

@Schema({ timestamps: true })
export class Cart extends Document {
  @Prop({ required: true, ref: 'User', type: mongoose.Types.ObjectId })
  user: mongoose.Types.ObjectId;

  @Prop({ required: true })
  cartItems: Array<CartItem>;

  @Prop()
  totalPrice: number;

  async calcTotalPrice(): Promise<number> {
    const cartItems: Array<{ product: Product; quantity: number }> = (
      await this.populate('cartItems.product')
    ).get('cartItems');
    let totalPrice = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      totalPrice += cartItems[i].product.price;
    }
    return totalPrice;
  }
}

export type CartDocument = Cart & Document;

export type CartItem = { product: Partial<Product>; quantity: number };

export const CartSchema = SchemaFactory.createForClass(Cart);

CartSchema.index({ user: 1 }, { unique: true });

// CartSchema.pre('find', function (next) {
//   this.populate('cartItems.product');
//   next();
// });

CartSchema.pre('save', async function (next) {
  this.totalPrice = await this.calcTotalPrice();
  next();
});

CartSchema.methods.calcTotalPrice = async function (): Promise<number> {
  const cartItems: Array<{ product: Product; quantity: number }> = (
    await this.populate('cartItems.product')
  ).get('cartItems');
  let totalPrice = 0;
  for (let i = 0; i < this.cartItems.length; i++) {
    totalPrice += cartItems[i].product.price;
  }
  return totalPrice;
};
