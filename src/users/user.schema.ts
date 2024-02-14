import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Product, ProductDocument } from 'src/products/product.schema';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({
    required: true,
    trim: true,
    select: false,
    minlength: 8,
    maxlength: 32,
  })
  password: string;

  @Prop({ trim: true })
  passwordConfirm: string;

  @Prop()
  passwordChangedAt: Date;

  @Prop({ enum: ['customer', 'admin', 'seller'], default: 'customer' })
  role: string;

  @Prop({ default: true, select: false })
  active: boolean;

  @Prop({
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  })
  location: {
    type: { type: String; default: 'Point' };
    coordinates: [number, number];
  };

  // @Prop({ default: [] })
  // cartItems: CartItems;

  async checkPassword(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  // async addToMyCart(cartItem: CartItem) {
  //   if (this.cartItems.length === 0) {
  //     this.cartItems = [cartItem];
  //     return await this.save();
  //   }
  //   const index = this.cartItems.findIndex(
  //     (val) => val.product.id.toString() === cartItem.product.id.toString(),
  //   );
  //   if (index !== -1) {
  //     this.cartItems[index].quantity += cartItem.quantity;
  //     return await this.save();
  //   }
  //   this.cartItems.push(cartItem);
  //   return await this.save();
  // }
}

// export type CartItems = Array<{
//   product: Partial<Product>;
//   quantity: number;
// }>;

// export type CartItem = {
//   product: Partial<Product>;
//   quantity: number;
// };

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ location: '2dsphere' });

UserSchema.methods.checkPassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  this as UserDocument;
  return await bcrypt.compare(candidatePassword, this.password);
};

// UserSchema.methods.addToMyCart = async function (cartItem: CartItem) {
//   if (this.cartItems.length === 0) {
//     this.cartItems = [cartItem];
//     return await this.save();
//   }
//   const index = this.cartItems.findIndex(
//     (val: CartItem) =>
//       val.product.id.toString() === cartItem.product.id.toString(),
//   );
//   console.log(index);
//   console.log(this.cartItems[index].quantity);
//   if (index !== -1) {
//     this.cartItems[index].quantity += cartItem.quantity;
//     console.log(this.cartItems[index].quantity);
//     return await this.save();
//   }
//   this.cartItems.push(cartItem);
//   return await this.save();
// };

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
