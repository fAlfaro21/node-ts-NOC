import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

//Aquí vamos a crear todas las instancias de las implementaciones
const fileSystemLogRepository = new LogRepositoryImplementation(
    new FileSystemDataSource()
    //Aquí podríamos cambiar el datasource, por ej:
    //new postgresSQLDataSource(),
    //new MongoDataSource(),
);

const emailService = new EmailService();

export class Server {

    //El static nos servirá para luego poder llamar al método así: Serve.start
    //...de lo contrario, tendría que primero crear una instancia del método y luego mandarlo llamar
    public static start() {

        console.log('Server started...');

        
        //console.log( envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL );
        //todo <----- Descomentar para enviar correos CON attachments: ---->
        //Mandamos a llamar nuetro useCase
        /* new SendEmailLogs(
            emailService,
            fileSystemLogRepository,
        ).execute(
            ['alfarogr@gmail.com','alfarogr@hotmail.com']
        ); */
        

        //Aquí iremos definiendo nuestros jobs

//        CronService.createJob(
//            '*/5 * * * * *',
//            () => {
//                const url = 'https://google.com';
//                new CheckService(
//                    fileSystemLogRepository, //Parámetro 1: LogRepository
//                    () => console.log( `${ url } is ok` ), //Parámetro 2: successCallback
//                    ( error ) => console.log(error), //Parámetro 3: errorCallback
//                ).execute( url);
//                //new CheckService().execute('http://localhost:3000');
//            }
//        ); 

    }

}