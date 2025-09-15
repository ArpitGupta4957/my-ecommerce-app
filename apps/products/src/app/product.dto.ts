import { IsString, IsOptional, IsNumber } from 'class-validator';


export class CreateProductDto {
  @IsString()
  code!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  rate!: number;

  @IsOptional()
  @IsString()
  image?: string;
}


export class UpdateProductDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  rate?: number;

  @IsOptional()
  @IsString()
  image?: string;
}
