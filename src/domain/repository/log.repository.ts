

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

//El LogRepository es quien me va a permitir llamar al LogDataSource
//Nos va a permitir llamar métodos que se encuentren dentro del datasource (LogDatasource)
//Nosotros al datasource llegamos a través del repositorio: Caso de uso > Repositorio > Remote Data Source
export abstract class LogRepository {

    abstract saveLog( log: LogEntity ): Promise<void>
    abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>

}