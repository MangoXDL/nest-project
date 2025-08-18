import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order-dto';
import { UpdateOrderDto } from './dto/update-order-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async takeOrders() {
    return await this.ordersRepository.find();
  }

  async createOrder(dto: CreateOrderDto) {
    const order = this.ordersRepository.create(dto);

    try {
      return await this.ordersRepository.save(order);
    } catch (error) {
      if (
        error.code === 'SQLITE_CONSTRAINT' // SQLite foreign key violation
      ) {
        throw new NotFoundException('User does not exist');
      }
      throw error;
    }
  }

  async takeOrder(id: number) {
    let order = await this.ordersRepository.find({
      where: { id },
      relations: ['user'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  async orderDelete(id: number) {
    const order = await this.ordersRepository.findBy({ id });

    if (!order) {
      return { message: 'deleted' };
    }

    await this.ordersRepository.delete({ id });
    return { message: 'deleted' };
  }

  async orderUpdate(id: number, dto: CreateOrderDto) {
    const order = await this.ordersRepository.findOneBy({ id });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    Object.assign(order, dto);

    return await this.ordersRepository.update({ id }, order);
  }

  async orderPatch(id: number, dto: UpdateOrderDto) {
    const order = await this.ordersRepository.findOneBy({ id });

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

    return await this.ordersRepository.update({ id }, order);
  }

  async takeUserOrders(id: number) {
    const orders = await this.ordersRepository.findBy({ userId: id });

    return orders;
  }
}
