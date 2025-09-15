import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const dto = { code: 'P1', name: 'Test', rate: 10 };
    (service.create as jest.Mock).mockResolvedValue(dto);
    expect(await controller.create(dto as any)).toEqual(dto);
  });

  it('should return all products', async () => {
    const result = [{ code: 'P1', name: 'Test', rate: 10 }];
    (service.findAll as jest.Mock).mockResolvedValue(result);
    expect(await controller.findAll()).toEqual(result);
  });

  it('should return one product', async () => {
    const result = { code: 'P1', name: 'Test', rate: 10 };
    (service.findOne as jest.Mock).mockResolvedValue(result);
    expect(await controller.findOne(1)).toEqual(result);
  });

  it('should update a product', async () => {
    const result = { name: 'Updated' };
    (service.update as jest.Mock).mockResolvedValue(result);
    expect(await controller.update(1, result as any)).toEqual(result);
  });

  it('should remove a product', async () => {
    const result = { deleted: true };
    (service.remove as jest.Mock).mockResolvedValue(result);
    expect(await controller.remove(1)).toEqual(result);
  });
});
