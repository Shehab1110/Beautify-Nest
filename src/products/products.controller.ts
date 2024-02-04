import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDocument } from './product.schema';
import { FilterQuery } from 'mongoose';
import { CreateProductDto } from './dtos/create-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles.decorator';
import { Req } from 'request-interface';
import { UpdateProdcutDto } from './dtos/update-product.dto';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async find(@Query() query: FilterQuery<ProductDocument>) {
    console.log(query);
    return await this.productService.find(query);
  }

  @Get('/:id')
  async findByID(@Param('id') id: string): Promise<ProductDocument> {
    return await this.productService.findProductByID(id);
  }

  @Post('/create-product')
  @Roles(['admin', 'seller'])
  async createProduct(@Body() product: CreateProductDto, @Request() req: Req) {
    product.seller.name = req.user.name;
    return this.productService.createProduct(product);
  }

  @Patch('/update-product')
  @Roles(['admin', 'seller'])
  async updateProduct(@Body() product: UpdateProdcutDto) {
    return this.productService.updateProduct(product);
  }

  @Delete('/:id')
  @Roles(['admin', 'seller'])
  async deleteProduct(@Param('id') id: string): Promise<void> {
    this.productService.deleteProduct(id);
  }
}
