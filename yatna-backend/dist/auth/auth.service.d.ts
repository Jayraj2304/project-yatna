import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
        token: string;
    }>;
    signup(signupDto: SignupDto): Promise<{
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
            createdAt: Date;
        };
    }>;
}
