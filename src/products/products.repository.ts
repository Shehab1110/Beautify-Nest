import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { FilterQuery, Model } from 'mongoose';

export class ProductsRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find({}).exec();
  }

  async findProductByID(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id);
  }

  async find(query: FilterQuery<ProductDocument>): Promise<ProductDocument[]> {
    if (query.name) query.name = { $regex: query.name, $options: 'i' };
    return this.productModel.find(query).exec();
  }

  async createProduct(product: Partial<Product>): Promise<ProductDocument> {
    return this.productModel.create(product);
  }

  async updateProduct(product: Partial<Product>): Promise<ProductDocument> {
    return this.productModel.findByIdAndUpdate(product.id, product, {
      new: true,
    });
  }

  async deleteProduct(id: string): Promise<void> {
    this.productModel.findByIdAndDelete(id).exec();
  }
}
