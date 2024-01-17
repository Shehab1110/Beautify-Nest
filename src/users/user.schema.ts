import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ required: true, unique: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ trim: true })
  passwordConfirm: string;

  @Prop()
  passwordChangedAt: Date;

  async checkPassword(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.checkPassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  this as UserDocument;
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
