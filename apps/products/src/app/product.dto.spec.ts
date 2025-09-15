import { validate } from 'class-validator';
import { CreateProductDto, UpdateProductDto } from './product.dto';

describe('CreateProductDto', () => {
  it('should validate required fields', async () => {
    const dto = new CreateProductDto();
    let errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    dto.code = 'P1';
    dto.name = 'Test';
    dto.rate = 10;
    errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate types', async () => {
    const dto = new CreateProductDto();
    dto.code = 123 as any;
    dto.name = 456 as any;
    dto.rate = 'abc' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe('UpdateProductDto', () => {
  it('should allow partial fields', async () => {
    const dto = new UpdateProductDto();
    let errors = await validate(dto);
    expect(errors.length).toBe(0);
    dto.name = 'Updated';
    errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
