import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class Server {

    //El static nos servirá para luego poder llamar al método así: Serve.start
    //...de lo contrario, tendría que primero crear una instancia del método y luego mandarlo llamar
    public static start() {

        console.log('Server started...');

        //Aquí iremos definiendo nuestros jobs

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckService(
                    () => console.log( `${ url } is ok` ), //Parámetro 1: successCallback
                    ( error ) => console.log(error), //Parámetro 2: errorCallback
                ).execute( url);
                //new CheckService().execute('http://localhost:3000');
            }
        ); 

    }

}