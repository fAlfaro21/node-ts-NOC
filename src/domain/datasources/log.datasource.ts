
//Se le pone abstract para que nadie pueda crear instancias de mi DataSource directamente
//Va a servir para definir el comportamiento que va a seguir este DataSource sobre otras clases

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

//es decir, cualquier clase que implemente mi LogDataSource deberá tener lo que yo defina a continuación
//Así pues, cualquier origen de datos va a tener que implementar el saveLog y el getLogs
//Es la implementación de las reglas de negocio para los datasources
export abstract class LogDataSource {

    abstract saveLog( log: LogEntity ): Promise<void>
    //Digamos que voy a querer recibir mis logs por severidad
    abstract getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]>

}