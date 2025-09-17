
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.ORDERS_DB_HOST || 'localhost',
      port: parseInt(process.env.ORDERS_DB_PORT || '5432', 10),
      username: process.env.ORDERS_DB_USERNAME || 'postgres',
      password: process.env.ORDERS_DB_PASSWORD || 'postgres',
      database: process.env.ORDERS_DB_NAME || 'orders_db',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [AppController, OrderController],
  providers: [AppService, OrderService],
})
export class AppModule {}
