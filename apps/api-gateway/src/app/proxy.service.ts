import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ProxyService {
  constructor(private readonly httpService: HttpService) {}

  async forwardToProducts(method: string, url: string, data?: any) {
    const baseUrl = 'http://localhost:3000/api/products';
    return this.httpService.request({
      method,
      url: `${baseUrl}${url}`,
      data,
    }).toPromise().then(res => res?.data);
  }

  async forwardToOrders(method: string, url: string, data?: any) {
    const baseUrl = 'http://localhost:3000/api/orders';
    return this.httpService.request({
      method,
      url: `${baseUrl}${url}`,
      data,
    }).toPromise().then(res => res?.data);
  }
}
