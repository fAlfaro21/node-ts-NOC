import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute( url: string ): Promise<boolean>;
}

//Para la monitorización del comportamiento del caso de uso: si falla o no
//Esta es la info que me pueden inyectar (2 funciones):
type SuccessCallback = ( () => void | undefined ); //Esto es lo que vamos a hacer si todo sale bien
type ErrorCallback = (( error: string) => void) | undefined;

//Este caso de uso es un verificador del servicio
export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        //Para la monitorización del comportamiento del caso de uso: si falla o no
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ){};

    public async execute( url: string ): Promise<boolean>{

        try {
            const req = await fetch( url );
            if ( !req.ok ){
                throw new Error(`Error on check service ${ url }`)
            }
            //Si todo sale bien: 
            // 1. Creo una nueva instancia de LogEntity,
            // 2. Grabo el log
            // 3. Mando llamar mi successCallback

            const log = new LogEntity({
                message: `Service ${ url } working`, 
                level: LogSeverityLevel.low, 
                origin: 'check-service.ts', } )
            this.logRepository.saveLog( log );
            this.successCallback && this.successCallback(); //Si el successCallback existe, lo mando llamar
            return true;

        } catch (error) {
            //Si no sale bien mando llamar mi errorCallback
            const errorMessage = `${ url } is not ok. ${ error }`;
            const log = new LogEntity( {
                message: errorMessage, 
                level: LogSeverityLevel.high,
                origin: 'check-service.ts',
            } )
            this.logRepository.saveLog( log );
            this.errorCallback && this.errorCallback( errorMessage );//Si el errorCallback existe, lo mando llamar
            return false;
        }

    }

}