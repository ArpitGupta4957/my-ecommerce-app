import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order', async () => {
    const dto = { customer: { name: 'John', phone: '123' }, products: [], totalAmount: 100 };
    (service.create as jest.Mock).mockResolvedValue(dto);
    expect(await controller.create(dto as any)).toEqual(dto);
  });

  it('should return all orders', async () => {
    const result = [{ customer: { name: 'John', phone: '123' }, products: [], totalAmount: 100 }];
    (service.findAll as jest.Mock).mockResolvedValue(result);
    expect(await controller.findAll()).toEqual(result);
  });

  it('should return one order', async () => {
    const result = { customer: { name: 'John', phone: '123' }, products: [], totalAmount: 100 };
    (service.findOne as jest.Mock).mockResolvedValue(result);
    expect(await controller.findOne(1)).toEqual(result);
  });
});
