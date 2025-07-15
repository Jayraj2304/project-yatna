/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guard/jwt.guard';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@Req() req) {
    return {
      message: 'You are authenticated!',
      user: req.user,
    };
  }
}
