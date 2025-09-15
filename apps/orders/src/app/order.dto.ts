import { IsString, IsNumber, IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class CustomerDto {
  @IsString()
  name!: string;

  @IsString()
  phone!: string;
}

class ProductOrderDto {
  @IsNumber()
  productId!: number;

  @IsNumber()
  quantity!: number;

  @IsNumber()
  rate!: number;
}

export class CreateOrderDto {
  @IsObject()
  @ValidateNested()
  @Type(() => CustomerDto)
  customer!: CustomerDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDto)
  products!: ProductOrderDto[];

  @IsNumber()
  totalAmount!: number;
}
