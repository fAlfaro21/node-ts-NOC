import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class MongoLogDatasource implements LogDataSource {

    async saveLog(log: LogEntity): Promise<void> {
        //Se crea una instancia del modelo de mongoose
        const newLog = await LogModel.create(log);
        //También podemos asegurarnos de guardarlo, pero en principio, no es necesario...
        //...con la instrucción del create es suficiente
        //await newLog.save();
        console.log( 'Mongo Log created: ', newLog.id );
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const logs = await LogModel.find({
            level: severityLevel
        });

        //Para el return no puedo devolver "logs" sin más puesto que su formato es tipo mongo y dista..
        //del formato de LogEntity, por eso lo tenemos que transformar:
        return logs.map( mongoLog => LogEntity.fromObject( mongoLog ));
        // O lo que es lo mismo:
        //return logs.map( LogEntity.fromObject );

    }
    
}