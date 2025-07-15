import { PrismaService } from '../prisma/prisma.service';
export declare class WorkoutService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        title: string;
        note?: string;
    }, userId: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        note: string | null;
        userId: number;
    }>;
    findAll(userId: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        note: string | null;
        userId: number;
    }[]>;
}
