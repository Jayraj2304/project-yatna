import { WorkoutService } from './workout.service';
export declare class WorkoutController {
    private readonly workoutService;
    constructor(workoutService: WorkoutService);
    createWorkout(body: any, req: any): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        note: string | null;
        userId: number;
    }>;
    getMyWorkouts(req: any): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        note: string | null;
        userId: number;
    }[]>;
}
