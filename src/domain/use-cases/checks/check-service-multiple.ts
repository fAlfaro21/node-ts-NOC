import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
    execute( url: string ): Promise<boolean>;
}

//Para la monitorización del comportamiento del caso de uso: si falla o no
//Esta es la info que me pueden inyectar (2 funciones):
type SuccessCallback = ( () => void | undefined ); //Esto es lo que vamos a hacer si todo sale bien. Al poner undefined, hacemos la función opcional: puede venir o no
type ErrorCallback = (( error: string) => void) | undefined; //Al poner undefined, hacemos la función opcional: puede venir o no

//Este caso de uso es un verificador del servicio
export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        //El caso de uso trabaja con el repositorio para llegar al datasource
        private readonly logRepository: LogRepository[],
        //Para la monitorización del comportamiento del caso de uso: si falla o no
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ){};

    //Para guardar el log en todos los repositorios existentes:
    private callLogs( log: LogEntity ){
        this.logRepository.forEach( logRepository => {
            logRepository.saveLog( log );
        } )
    }

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
            this.callLogs( log );
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
            this.callLogs( log );
            this.errorCallback && this.errorCallback( errorMessage );//Si el errorCallback existe, lo mando llamar
            return false;
        }

    }

}