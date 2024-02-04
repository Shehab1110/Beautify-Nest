import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Product extends Document {
  @Prop({
    required: true,
    trim: true,
    maxlength: 40,
    minlength: 3,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: 200,
    minlength: 10,
  })
  description: string;

  @Prop({
    required: true,
    min: 0,
  })
  price: number;

  @Prop()
  image: string;

  @Prop({
    required: true,
    enum: [
      'face',
      'eyes',
      'lips',
      'nails',
      'brushes and tools',
      'makeup removals',
      'skin care',
      'hair care',
      'bath and body',
    ],
  })
  category: string;

  @Prop({ default: 0 })
  ratingNum: number;

  @Prop({ default: 4.5 })
  rate: number;

  @Prop({ required: true, type: Object })
  seller: {
    name: string;
  };

  @Prop({ default: 1, min: 0, required: true })
  inStock: number;

  @Prop({ default: 0 })
  soldCount: number;
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ price: 1, category: 1 }, { unique: false });
