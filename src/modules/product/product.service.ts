import { Injectable, NotFoundException } from '@nestjs/common';
import { Entity, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateOrderDto } from '../orders/dto/create-order-dto';
import { ProductOrder } from './product-order.entity';
import { Order } from '../orders/order.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepositrory: Repository<Product>,
    @InjectRepository(ProductOrder)
    private productOrderRepositrory: Repository<ProductOrder>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
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

  // finish userId check
  async oneProductToOrder(productId: number, orderId: number, userId: number) {
    const order = this.orderRepository.find({ order: order });

    const productOrder = this.productOrderRepositrory.create({
      productId,
      orderId,
    });

    return await this.productOrderRepositrory.save(productOrder);
  }

  async getProductFromOrder(orderId: number) {
    const productOrders = await this.productOrderRepositrory.find({
      where: {
        orderId,
      },
      relations: ['product'],
    });

    const products: Product[] = [];
    for (const productOrder of productOrders) {
      products.push(productOrder.product);
    }

    return products;
  }

  async removeProductFromOrder(productId: number, orderId: number) {
    const productOrder = await this.productOrderRepositrory.findOneBy({
      orderId,
      productId,
    });

    if (productOrder) {
      this.productOrderRepositrory.remove(productOrder);
    }

    return { message: 'Product removed from order' };
  }

  async getProductAmountFromOrder(orderId: number) {
    if (orderId) {
      return this.productOrderRepositrory.count({
        where: { orderId },
      });
    }
    return 0;
  }
}
