import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('json')
  customer!: {
    name: string;
    phone: string;
  };

  @Column('json')
  products!: Array<{
    productId: number;
    quantity: number;
    rate: number;
  }>;

  @Column('decimal')
  totalAmount!: number;
}
