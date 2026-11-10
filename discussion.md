
-> priority first  ( we can later incorporate weighted distribution )
-> JOB ( we have to create this entity ) 
    -> state ( QUEUED, PROCESSING, COMPLETED,, FALIED, RETRYING )
    - id, priority, createdAt, payload ( type), service name

-> High LVL arch : 

POST -> API req -> takes the job ( store it ) -> queues it -> return the response
( background: the worker would just get the next job from the queue and process it)

create an idempotency key 
-> based on payload -> hash the payload + severity 

GET -> returned stored job 

JOB -> MAP ( job id vs the job details )

MAP -> idempotency key VS the job id 

Retries: hard code to 3 reties per failure
We can log for now that some operation failed


API design: 

POST job -> /job ( POST endpoint )

> body: serviceName, priority payload : { type: , data : "}
Acceptance of the job -> return the status ( 200 )

if there is some error from user side: 4XX 

Fetch job: 

GET : /job/:id

get the id from the map and return its status. 


-> 


