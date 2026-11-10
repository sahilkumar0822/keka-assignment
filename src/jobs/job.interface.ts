
export enum JobPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export enum JobStatus {
    QUEUED = 'queued',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    FAILED = 'failed',
}

export interface Job {
    id: string,
    payload: any,
    priority: JobPriority,
    status: JobStatus,
    createdAt: Date,
}