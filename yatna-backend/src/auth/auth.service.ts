/* eslint-disable prettier/prettier */
import { Injectable, ConflictException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,private jwtService: JwtService) {}
  
  async login(loginDto: LoginDto) {
  try {
    console.log('Login DTO:', loginDto); // 👈 check if DTO is undefined

    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    console.log('Found user:', user); // 👈 confirm Prisma is returning a user

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', passwordValid); // 👈 log match result

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };

  } catch (error) {
    console.error('🔥 Login error:', error); // 👈 this should now print in terminal
    throw error;
  }
}


  async signup(signupDto: SignupDto) {
    const { name, email, password } = signupDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }
}
