/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  createWorkout(@Body() body, @Req() req) {
    return this.workoutService.create(body, req.user.userId);
  }

  @Get()
  getMyWorkouts(@Req() req) {
    return this.workoutService.findAll(req.user.userId);
  }
}
