import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { Repository } from 'typeorm';

describe('OrderService', () => {
  let service: OrderService;
  let repo: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repo = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an order', async () => {
    const dto = { customer: { name: 'John', phone: '123' }, products: [], totalAmount: 100 };
    const order = { id: 1, ...dto } as Order;
    jest.spyOn(repo, 'create').mockReturnValue(order);
    jest.spyOn(repo, 'save').mockResolvedValue(order);
    expect(await service.create(dto as any)).toEqual(order);
  });

  it('should find all orders', async () => {
    const orders = [{ id: 1, customer: { name: 'John', phone: '123' }, products: [], totalAmount: 100 } as Order];
    jest.spyOn(repo, 'find').mockResolvedValue(orders);
    expect(await service.findAll()).toEqual(orders);
  });

  it('should find one order', async () => {
    const order = { id: 1, customer: { name: 'John', phone: '123' }, products: [], totalAmount: 100 } as Order;
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(order);
    expect(await service.findOne(1)).toEqual(order);
  });
});
