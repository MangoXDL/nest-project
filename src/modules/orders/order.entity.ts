import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { ProductOrder } from '../product/product-order.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  user: User;

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.order)
  productOrder: ProductOrder;
}
