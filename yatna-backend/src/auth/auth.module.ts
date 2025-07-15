/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // 👈 make sure this is set (use env var later)
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}