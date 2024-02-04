import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product, ProductDocument } from './product.schema';
import { FilterQuery } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepo: ProductsRepository) {}

  async findAll(): Promise<ProductDocument[]> {
    return this.productRepo.findAll();
  }

  async findProductByID(id: string): Promise<ProductDocument> {
    return this.productRepo.findProductByID(id);
  }

  async find(query: FilterQuery<ProductDocument>) {
    return query ? this.productRepo.find(query) : this.productRepo.findAll();
  }

  async createProduct(product: Partial<Product>): Promise<ProductDocument> {
    return this.productRepo.createProduct(product);
  }

  async updateProduct(
    product: Partial<ProductDocument>,
  ): Promise<ProductDocument> {
    const updatedProduct = await this.productRepo.updateProduct(product);
    if (!updatedProduct)
      throw new NotFoundException(
        `Product with id: ${product.id} is not found!`,
      );
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    this.productRepo.deleteProduct(id);
  }
}
