import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderDto } from './dto/create-order-dto';
import { UpdateOrderDto } from './dto/update-order-dto';

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

  @Get('/order/:id')
  getOrderById(@Param('id') id: number) {
    const order = this.orderService.takeOrder(Number(id));
    return order;
  }

  @Delete('/order/:id')
  deleteOrder(@Param('id') id: number) {
    return this.orderService.orderDelete(Number(id));
  }

  // @Put

  @Put('/order/:id')
  updateOrder(@Param('id') id: number, @Body() dto: CreateOrderDto) {
    return this.orderService.orderUpdate(Number(id), dto);
  }

  @Patch('order/:id')
  patchOrder(@Param('id') id: number, @Body() dto: UpdateOrderDto) {
    return this.orderService.orderPatch(Number(id), dto);
  }
}
