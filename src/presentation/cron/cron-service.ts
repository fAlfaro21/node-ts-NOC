import { CronJob } from "cron";

//ESTE VA A SER NUESTRO PATRON ADAPTADOR

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {

    //Va a regresar algo de tipo CronJob
    static createJob( cronTime: CronTime, onTick:OnTick ): CronJob {

        const job = new CronJob( cronTime, onTick );

        job.start();

        return job;

    }

}