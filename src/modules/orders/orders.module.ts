import { Module } from '@nestjs/common';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { OrdersRepositry } from './orders.repository';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService, OrdersRepositry],
})
export class OrderModule {}
