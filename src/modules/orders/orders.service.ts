import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order-dto';
import { OrdersRepositry } from './orders-repository';

@Injectable()
export class OrderService {
  constructor(private readonly ordersRepositry: OrdersRepositry) {}

  takeOrders() {
    return this.ordersRepositry.findAll();
  }

  createOrder(dto: CreateOrderDto) {
    this.ordersRepositry.save(dto);
  }
}
