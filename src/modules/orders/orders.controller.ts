import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Patch,
  Req,
} from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderDto } from './dto/create-order-dto';
import { UpdateOrderDto } from './dto/update-order-dto';
import { CustomRequest } from 'src/common/auth/custom.request';

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
  createOrder(@Body() dto: CreateOrderDto, @Req() req: CustomRequest) {
    const userId = req.user.userId;
    return this.orderService.createOrder(dto, userId);
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
  updateOrder(
    @Param('id') id: number,
    @Body() dto: CreateOrderDto,
    @Req() req: CustomRequest,
  ) {
    const userId = req.user.userId;

    return this.orderService.orderUpdate(Number(id), dto, userId);
  }

  @Patch(':id')
  patchOrder(
    @Param('id') id: number,
    @Body() dto: UpdateOrderDto,
    @Req() req: CustomRequest,
  ) {
    const userId = req.user.userId;

    return this.orderService.orderPatch(Number(id), dto, userId);
  }

  @Get('user')
  getUserOrders(@Req() req: CustomRequest) {
    const userId = req.user.userId;
    return this.orderService.takeUserOrders(userId);
  }
}
