import { Controller, All, Req, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import express from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('products')
export class ProductsProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('*')
  @UseGuards(JwtAuthGuard)
  async proxy(@Req() req: express.Request, @Res() res: express.Response) {
    const { method, originalUrl, body } = req;
    try {
      const data = await this.proxyService.forwardToProducts(method, originalUrl.replace(/^\/api\/products/, ''), body);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        error.response !== null &&
        'status' in error.response
      ) {
        const status = typeof (error.response as { status?: number }).status === 'number'
          ? (error.response as { status: number }).status
          : 500;
        const data = (error.response && typeof error.response === 'object' && 'data' in error.response)
          ? (error.response as { data: any }).data
          : { message: 'Proxy error' };
        res.status(status).json(data);
      } else {
        res.status(500).json({ message: 'Proxy error' });
      }
    }
  }
}

@Controller('orders')
export class OrdersProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('*')
  @UseGuards(JwtAuthGuard)
  async proxy(@Req() req: express.Request, @Res() res: express.Response) {
    const { method, originalUrl, body } = req;
    try {
      const data = await this.proxyService.forwardToOrders(method, originalUrl.replace(/^\/api\/orders/, ''), body);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        error.response !== null &&
        'status' in error.response
      ) {
        const status = typeof (error.response as { status?: number }).status === 'number'
          ? (error.response as { status: number }).status
          : 500;
        const data = (error.response && typeof error.response === 'object' && 'data' in error.response)
          ? (error.response as { data: any }).data
          : { message: 'Proxy error' };
        res.status(status).json(data);
      } else {
        res.status(500).json({ message: 'Proxy error' });
      }
    }
  }
}
