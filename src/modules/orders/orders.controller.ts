import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderDto } from './dto/create-order-dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/orders')
  takeOrders(): object {
    const obj: object = {
      message: this.orderService.takeOrders(),
    };
    return obj;
  }

  @Post('/order')
  createOrder(@Body() dto: CreateOrderDto) {
    this.orderService.createOrder(dto);
  }
}
