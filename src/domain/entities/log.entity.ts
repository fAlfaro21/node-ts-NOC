
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    //Inicializamos nuestras propiedades cuando se cree una instancia:
    constructor( message: string, level: LogSeverityLevel ){
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    //Este método será para hacer la conversión más fácil
    //Será estático porque no quiero crearme una instancia para llamarlo
    //Será como un factory constructor
    //Voy a recibir una instancia del LogEntity
    static fromJson = ( json: string ): LogEntity => {
        const { message, level, createdAt } = JSON.parse( json );
        //<-- Aquí podríamos añadir validaciones para asegurarnos que lo tenemos todo -->
        const log = new LogEntity( message, level );
        //Creamos la fecha basado en el string del log
        log.createdAt = new Date( createdAt );
        return log;
    };

}