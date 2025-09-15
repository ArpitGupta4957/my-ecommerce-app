import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxyService } from './proxy.service';
import { ProductsProxyController, OrdersProxyController } from './proxy.controller';
import { AuthModule } from './auth.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [AppController, ProductsProxyController, OrdersProxyController, AuthController],
  providers: [AppService, ProxyService],
})
export class AppModule {}
