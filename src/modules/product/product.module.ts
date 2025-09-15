import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductOrder } from './product-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductOrder])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
