import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product-dto';
import { CustomRequest } from 'src/common/auth/custom.request';
// import { CreateProductDto } from './dto/create-product-dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/product')
  createProduct(@Body() dto: CreateProductDto) {
    return this.productService.productCreate(dto);
  }

  @Get('/products')
  getAllProducts(@Query('page') page: number, @Query('size') size: number) {
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

  @Post('/product/:productId/order/:orderId')
  productToOrder(
    @Param('productId') productId: number,
    @Param('orderId') orderId: number,
    @Req() req: CustomRequest,
  ) {
    const userId = req.user.userId;
    return this.productService.oneProductToOrder(
      Number(productId),
      Number(orderId),
      userId,
    );
  }

  @Get('products/order/:id')
  getProductInOrder(@Param('id') id: number) {
    return this.productService.getProductFromOrder(Number(id));
  }

  @Delete('/product/:productId/order/:orderId')
  deleteProductFromOrder(
    @Param('productId') productId: number,
    @Param('orderId') orderId: number,
  ) {
    return this.productService.removeProductFromOrder(
      Number(productId),
      Number(orderId),
    );
  }

  @Get('/product-amount/order/:id')
  getProductAmountInOrder(@Param('id') id: number) {
    return this.productService.getProductAmountFromOrder(Number(id));
  }
}
