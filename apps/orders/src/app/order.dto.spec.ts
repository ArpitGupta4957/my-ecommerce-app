import { validate } from 'class-validator';
import { CreateOrderDto } from './order.dto';

describe('CreateOrderDto', () => {
  it('should validate required fields', async () => {
    const dto = new CreateOrderDto();
    let errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    dto.customer = { name: 'John', phone: '123' };
    dto.products = [];
    dto.totalAmount = 100;
    errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate types', async () => {
    const dto = new CreateOrderDto();
    dto.customer = 'not-an-object' as any;
    dto.products = 'not-an-array' as any;
    dto.totalAmount = 'not-a-number' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
