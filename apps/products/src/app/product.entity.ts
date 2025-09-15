import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  code!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column('decimal')
  rate!: number;

  @Column({ nullable: true })
  image?: string;
}
