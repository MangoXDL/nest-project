import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateOrderDto } from '../orders/dto/create-order-dto';
// import { Product } from './product.entity';
// import { CreateProductDto } from './dto/create-product-dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepositrory: Repository<Product>,
  ) {}

  async productCreate(dto: CreateOrderDto) {
    const product = this.productRepositrory.create(dto);
    return await this.productRepositrory.save(product);
  }

  productGetAll(page: number, size: number) {
    return this.productRepositrory.find({
      skip: page * size - size,
      take: size,
    });
  }

  async productGet(id: number) {
    const product = await this.productRepositrory.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async productDelete(id: number) {
    await this.productRepositrory.delete({ id });
  }
}
