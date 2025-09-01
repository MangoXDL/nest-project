import { Controller, Body, Post, Get, Delete, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product-dto';
// import { CreateProductDto } from './dto/create-product-dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/product')
  createProduct(@Body() dto: CreateProductDto) {
    return this.productService.productCreate(dto);
  }

  @Get('/products')
  getAllProducts(@Param('page') page: number, @Param('size') size: number) {
    return this.productService.productGetAll(
      Number(page) || 1,
      Number(size) || 20,
    );
  }

  @Get('/product/:id')
  getProduct(@Param('id') id: number) {
    return this.productService.productGet(Number(id));
  }

  @Delete('/product/:id')
  deleteProduct(@Param('id') id: number) {
    this.productService.productDelete(Number(id));
    return { message: 'success' };
  }
}

// HM - finish product creation and get all products endpoints
