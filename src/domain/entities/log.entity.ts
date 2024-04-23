
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

//Opciones para crear una instancia de LogEntity
export interface LogEntityOptions {
    level: LogSeverityLevel,
    message: string,
    origin: string,
    createdAt?: Date,
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string; //Para saber desde qué archivo se originó el log

    constructor( options: LogEntityOptions ){
        //Inicializo nuestras propiedades cuando se cree una instancia:
        const { message, level, origin, createdAt = new Date() } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    //Este método será para hacer la conversión más fácil
    //Será estático porque no quiero crearme una instancia para llamarlo
    //Será como un factory constructor
    //Voy a devolver una instancia del LogEntity
    //Este sería el formato del log a recibir como parámetro:
    //{"message":"Service https://google.com working","level":"low","createdAt":"2024-02-19T15:40:40.456Z"}
    static fromJson = ( json: string ): LogEntity => {
        json = ( json === '' ) ? '{}': json;
        const { message, level, createdAt, origin } = JSON.parse( json );
        //<-- Aquí podríamos añadir validaciones para asegurarnos que lo tenemos todo -->
        const log = new LogEntity( {
            message: message, 
            level: level, 
            createdAt: createdAt,
            origin: origin,
        } );

        return log;
    };

    //Vamos a adaptar el objeto mongo al objeto logEntity
    //Voy a permitir recibir un objeto cuya llave es un string y de tipo any, y va a devolver un LogEntity
    static fromObject = ( object: { [ key: string ]: any } ): LogEntity => {
        const { message, level, createdAt, origin } = object;
        //Aquí se pueden hacer validaciones para asegurar que la instancia se cree correctamente
        const log = new LogEntity( {
            message: message, 
            level: level, 
            createdAt: createdAt,
            origin: origin,
        } );

        return log;
    }

}