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
    let totalPrice = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      const { product, quantity } = this.cartItems[i];
      totalPrice += product.price * quantity;
    }
    return totalPrice;
  }
}

export type CartDocument = Cart & Document;

export type CartItem = { product: Partial<Product>; quantity: number };

export const CartSchema = SchemaFactory.createForClass(Cart);

CartSchema.index({ user: 1 }, { unique: true });

CartSchema.pre('save', async function (next) {
  let totalPrice = 0;
  for (let i = 0; i < this.cartItems.length; i++) {
    const { product, quantity } = this.cartItems[i];
    totalPrice += product.price * quantity;
  }
  next();
});

CartSchema.methods.calcTotalPrice = async function (): Promise<number> {
  let totalPrice = 0;
  for (let i = 0; i < this.cartItems.length; i++) {
    const { product, quantity } = this.cartItems[i];
    totalPrice += product.price * quantity;
  }
  return totalPrice;
};
