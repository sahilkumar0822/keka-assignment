import { Job, JobPriority, JobStatus } from "./job.interface.js";


export class JobService {
    private jobs = new Map<string, Job>();
    private isProcessing: boolean;

    private queues = {
        [JobPriority.LOW]: [] as string[],
        [JobPriority.MEDIUM]: [] as string[],
        [JobPriority.HIGH]: [],
    }

    constructor() {
        this.isProcessing = true;
    }

    async submitJob(payload: Record<string, any>, priority: JobPriority): Promise<Job> {
        const job: Job = {
            id: crypto.randomUUID(),
            payload,
            priority,
            status: JobStatus.QUEUED,
            createdAt: new Date(),
        };


        this.jobs.set(job.id, job);
        this.queues[job.priority].push(job.id);

        // process the job 
        await this.processQueue(job);
        return job;
    }


    private async processQueue() {
        // run a loop to process the job

        // 1. get the next job
        if (this.isProcessing) return;
        this.isProcessing = true;

        const nextJobId = this.getNextJobId();

        try {
            await this.executeJob(job);

            job.status = JobStatus.COMPLETED;

        } catch (error) {

        } finally {
            this.isProcessing = false;
        }
    }

    private async executeJob(job: Job) {
        // simulate job execution
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.8) {
                    resolve();
                } else {
                    reject(new Error('Job failed'));
                }
            })
        })
    }

    private getNextJobId(): string | undefined {
        if (this.queues[JobPriority.HIGH].length > 0) {
            return this.queues[JobPriority.HIGH].shift();
        } else if (this.queues[JobPriority.MEDIUM].length > 0) {
            return this.queues[JobPriority.MEDIUM].shift();
        } else if (this.queues[JobPriority.LOW].length > 0) {
            return this.queues[JobPriority.LOW].shift();
        }
    }

}