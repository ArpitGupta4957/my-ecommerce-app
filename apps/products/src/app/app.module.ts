
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PRODUCTS_DB_HOST || 'localhost',
      port: parseInt(process.env.PRODUCTS_DB_PORT || '5432', 10),
      username: process.env.PRODUCTS_DB_USERNAME || 'postgres',
      password: process.env.PRODUCTS_DB_PASSWORD || 'postgres',
      database: process.env.PRODUCTS_DB_NAME || 'products_db',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
  TypeOrmModule.forFeature([Product]),
  ],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule {}
