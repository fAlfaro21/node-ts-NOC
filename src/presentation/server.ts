import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

//Aquí vamos a CREAR la instancia que voy a utilizar para mandarsela a todos los usecases 
//.. que puedan requerir ese repositorio
//Es aquí que vamos a crear todas las instancias de las implementaciones
const fsLogRepository = new LogRepositoryImplementation(
    //Aquí definimos los datasource, de modo que podríamos cambiar el datasource, por ej:
    
    //En esta línea el datasource está grabando en fileSystem
    new FileSystemDataSource()     
);

const mongoLogRepository = new LogRepositoryImplementation(
    //Aquí definimos los datasource, de modo que podríamos cambiar el datasource, por ej:
    
    //En esta línea el datasource está grabando en MongoDB
    new MongoLogDatasource(),     
);

const postgresLogRepository = new LogRepositoryImplementation(
    //Aquí definimos los datasource, de modo que podríamos cambiar el datasource, por ej:
    
    //En esta línea el datasource está grabando en Postgres
    new PostgresLogDatasource(),   
);

const emailService = new EmailService();

export class Server {

    //El static nos servirá para luego poder llamar al método así: Serve.start
    //...de lo contrario, tendría que primero crear una instancia del método y luego mandarlo llamar
    public static async start() {

        console.log('Server started...');

        
        //console.log( envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL );
        //todo <----- Descomentar para enviar correos CON attachments: ---->
        //Mandamos a llamar nuetro useCase
        /* new SendEmailLogs(
            emailService,
            fileSystemLogRepository,
        ).execute(
            ['alfarogr@gmail.com','alfarogr@hotmail.com']
        );

        //Para mostrar los logs por severidad:
        const logs = await logRepository.getLogs( LogSeverityLevel.low );
        console.log( logs ); */

        //Aquí iremos definiendo nuestros jobs

        
//        CronService.createJob(
 //           '*/5 * * * * *',
  //          () => {
   //            const url = 'https://googles.com';
    //           new CheckServiceMultiple(
                    //Parámetro 1: LogRepository, es el repositorio que queremos utilizar
      //              [fsLogRepository, mongoLogRepository, postgresLogRepository], 
                    //Parámetro 2: successCallback
       //             () => console.log( `${ url } is ok` ), 
                    //Parámetro 3: errorCallback
         //           ( error ) => console.log(error), 
          //      ).execute( url);
                //new CheckService().execute('http://localhost:3000');
          //  }
        //); 

   }

}