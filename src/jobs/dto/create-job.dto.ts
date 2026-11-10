import { JobPriority } from "../job.interface.js";

import { IsNotEmpty, IsEnum } from "class-validator";

export class CreateJobDto {
    @IsNotEmpty()
    payload: Record<string, any>;

    @IsNotEmpty()
    @IsEnum(JobPriority)
    priority: JobPriority;
}