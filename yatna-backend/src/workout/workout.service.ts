/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkoutService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; note?: string }, userId: number) {
    return this.prisma.workout.create({
      data: {
        title: data.title,
        note: data.note,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.workout.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
