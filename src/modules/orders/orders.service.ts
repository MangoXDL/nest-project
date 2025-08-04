import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order-dto';
import { OrdersRepositry } from './orders.repository';
import { UpdateOrderDto } from './dto/update-order-dto';

@Injectable()
export class OrderService {
  constructor(private readonly ordersRepositry: OrdersRepositry) {}

  takeOrders() {
    return this.ordersRepositry.findAll();
  }

  createOrder(dto: CreateOrderDto) {
    const order = this.ordersRepositry.create(dto);

    this.ordersRepositry.save(order);
  }

  takeOrder(id: number) {
    let order = this.ordersRepositry.findById(id);

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  orderDelete(id: number) {
    console.log(id, typeof id);
    const order = this.ordersRepositry.findById(id);

    if (!order) {
      return { message: 'deleted' };
    }

    this.ordersRepositry.delete(order);
    return { message: 'deleted' };
  }

  orderUpdate(id: number, dto: CreateOrderDto) {
    const order = this.ordersRepositry.findById(id);

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    Object.assign(order, dto);

    return this.ordersRepositry.update(order);
  }

  orderPatch(id: number, dto: UpdateOrderDto) {
    const order = this.ordersRepositry.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    // {name: 'new name', price: 100}.keys() => ['name', 'price']

    // ['name', 'price'].forEach((key) => {...})
    Object.keys(dto).forEach((key) => {
      if (dto[key] !== undefined) {
        order[key] = dto[key];
      }
    });

    return this.ordersRepositry.update(order);
  }
}
