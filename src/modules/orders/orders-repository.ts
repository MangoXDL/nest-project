import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersRepositry {
  orders: any[] = [];

  save(order) {
    return this.orders.push(order);
  }

  findAll() {
    return this.orders;
  }
}
