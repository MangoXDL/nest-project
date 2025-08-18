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

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async takeOrders() {
    const obj: object = {
      message: await this.orderService.takeOrders(),
    };
    return obj;
  }

  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }

  @Get(':id')
  getOrderById(@Param('id') id: number) {
    const order = this.orderService.takeOrder(Number(id));
    return order;
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: number) {
    return this.orderService.orderDelete(Number(id));
  }

  // @Put

  @Put(':id')
  updateOrder(@Param('id') id: number, @Body() dto: CreateOrderDto) {
    return this.orderService.orderUpdate(Number(id), dto);
  }

  @Patch(':id')
  patchOrder(@Param('id') id: number, @Body() dto: UpdateOrderDto) {
    return this.orderService.orderPatch(Number(id), dto);
  }

  @Get('user/:id')
  getUserOrders(@Param('id') id: number) {
    return this.orderService.takeUserOrders(Number(id));
  }
}
