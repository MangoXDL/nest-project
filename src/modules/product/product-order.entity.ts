import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Order } from '../orders/order.entity';

@Entity()
export class ProductOrder {
  @ManyToOne(() => Product, { nullable: false, onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.productOrder, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  order: Order;

  @Column()
  orderId: number;

  @Column()
  productId: number;

  @PrimaryGeneratedColumn()
  id: number;
}
