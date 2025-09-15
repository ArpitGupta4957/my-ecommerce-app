import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

describe('ProductService', () => {
  let service: ProductService;
  let repo: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const dto = { code: 'P1', name: 'Test', rate: 10 };
    const product = { id: 1, ...dto } as Product;
    jest.spyOn(repo, 'create').mockReturnValue(product);
    jest.spyOn(repo, 'save').mockResolvedValue(product);
    expect(await service.create(dto as any)).toEqual(product);
  });

  it('should find all products', async () => {
    const products = [{ id: 1, code: 'P1', name: 'Test', rate: 10 } as Product];
    jest.spyOn(repo, 'find').mockResolvedValue(products);
    expect(await service.findAll()).toEqual(products);
  });

  it('should find one product', async () => {
    const product = { id: 1, code: 'P1', name: 'Test', rate: 10 } as Product;
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(product);
    expect(await service.findOne(1)).toEqual(product);
  });

  it('should update a product', async () => {
    jest.spyOn(repo, 'update').mockResolvedValue({} as any);
    expect(await service.update(1, { name: 'Updated' } as any)).toEqual({} as any);
  });

  it('should remove a product', async () => {
    jest.spyOn(repo, 'delete').mockResolvedValue({} as any);
    expect(await service.remove(1)).toEqual({} as any);
  });
});
