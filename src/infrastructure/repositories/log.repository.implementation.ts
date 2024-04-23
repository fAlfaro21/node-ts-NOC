import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRepositoryImplementation implements LogRepository {

    constructor(
        //Inyección de dependencia
        private readonly logDataSource: LogDataSource, // <--- aquí podría conectar cualquier otro tipo de datasource siempre y cuando implementen los dos métodos que definí (FileSystem, Mongo, Postgres, SQLServer, etc)
    ){}

    async saveLog(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLog( log );
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs( severityLevel );
    }
    
};