
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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'products_db',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
  TypeOrmModule.forFeature([Product]),
  ],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule {}
