import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Post('login')
  login(@Body() body: { username: string }) {
    // In production, validate user credentials!
    const payload = { username: body.username, sub: Date.now() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
