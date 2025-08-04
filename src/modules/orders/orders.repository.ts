import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';

@Injectable()
export class OrdersRepositry {
  orders: Order[] = [];
  private static idCounter = 0;

  save(order: Order) {
    return this.orders.push(order);
  }

  findAll() {
    return this.orders;
  }

  create(order: Pick<Order, 'name' | 'price'>): Order {
    const newOrder = new Order();
    Object.assign(newOrder, order);
    newOrder.id = OrdersRepositry.idCounter++;
    return newOrder;
  }

  findById(id: number): Order | undefined {
    const order = this.orders.find((order) => {
      return order.id === id;
    });

    return order;
  }

  delete(order: Order) {
    const indexOfOrder = this.orders.indexOf(order);
    this.orders.splice(indexOfOrder, 1);
  }

  update(order: Order): Order | undefined {
    const findOrder = this.orders.findIndex((orders) => orders.id === order.id);
    if (findOrder === -1) return undefined;

    this.orders[findOrder] = order;
    return order;
  }
}

// add can work strings a,b - output is string. Numbers a,b - output is number.

// function add<T extends number | string>(a: T, b: T): T {}
