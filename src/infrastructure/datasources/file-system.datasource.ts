import fs from 'fs';
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


//FileSystemDataSource va a implementar las reglas que definí en el LogDataSource
export class FileSystemDataSource implements LogDataSource {
    //Hacemos la implementación de nuestro datasource

    //Aquí van a estar grabados mis logs
    private readonly logPath = 'logs/'; 
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor(){
        //Cuando se cree una instancia de nuestro FileSystemDataSource vamos a mandar a llamar este método
        this.createLogsFiles();
    };

    //Creamos los ficheros
    private createLogsFiles = () => {
        if( !fs.existsSync( this.logPath ) ) {
            fs.mkdirSync( this.logPath );
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach( path => {
            if ( fs.existsSync( path ) ) return;
            fs.writeFileSync( path, '' );

        })

    };

    async saveLog( newLog: LogEntity ): Promise<void> {

        const logAsJson = `${ JSON.stringify( newLog ) }\n`;

        //Añadimos una línea al final del allLogsPath
        //Y lo guardamos en un formato json
        fs.appendFileSync( this.allLogsPath, logAsJson );
        
        if( newLog.level === LogSeverityLevel.low ) return;

        if( newLog.level === LogSeverityLevel.medium ){
            fs.appendFileSync( this.mediumLogsPath, logAsJson );
        } else {
            fs.appendFileSync( this.highLogsPath, logAsJson );
        }

    };

    private getLogsFromFile = ( path: string ): LogEntity[] => {
        
        const content = fs.readFileSync( path, 'utf-8' );
        const logs = content.split( '\n' ).map( 
            log => LogEntity.fromJson( log ));
        //O lo que es lo mismo:
        //const logs = content.split( '\n' ).map( LogEntity.fromJson );
        return logs;
    };

    async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
        
        switch ( severityLevel ) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile( this.allLogsPath );

            case LogSeverityLevel.medium:
                return this.getLogsFromFile( this.mediumLogsPath );

            case LogSeverityLevel.high:
                return this.getLogsFromFile( this.highLogsPath );
            
            default:
                throw new Error(`${ severityLevel } not implemented`);
        };

    };

}