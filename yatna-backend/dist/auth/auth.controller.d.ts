import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
