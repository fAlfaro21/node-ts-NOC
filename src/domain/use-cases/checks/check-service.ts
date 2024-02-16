
interface CheckServiceUseCase {
    execute( url: string ): Promise<boolean>;
}

//Para la monitorización del comportamiento del caso de uso: si falla o no
//Esta es la info que me pueden inyectar (2 funciones):
type SuccessCallback = () => void; //Esto es lo que vamos a hacer si todo sale bien
type ErrorCallback = ( error: string) => void;

//Este caso de uso es un verificador del servicio
export class CheckService implements CheckServiceUseCase {

    constructor(
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
            //Si todo sale bien mando llamar mi successCallback
            this.successCallback();
            return true;

        } catch (error) {
            console.log(`${ error }`)
            //Si no sale bien mando llamar mi errorCallback
            this.errorCallback(`${error}`);
            return false;
        }

    }

}