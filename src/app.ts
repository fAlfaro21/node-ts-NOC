
import { PrismaClient } from '@prisma/client';
import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

//Función autoinvocada
(async() => {
    main();
})();

async function main() {

    //Primero nos conectamos a la DDBB
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    })

    const prisma = new PrismaClient();
    /* const newLog = await prisma.logModel.create({
        data: {
            level: 'HIGH',
            message: 'Test message',
            origin: 'App.ts',
        }
    }); */

    /* const logs = await prisma.logModel.findMany({
        where: {
            level: 'HIGH',
        }
    }); */

    

    //Creo una colección (tabla), y un documento (registro)
    //...creo como una instancia

   /* const newLog = await LogModel.create({
        message: 'Test message desde Mongo',
        origin: 'App.ts',
        level: 'low',
    }) */

    //Guardo mi colección/documento
    //await newLog.save();
    //console.log(newLog);
 

    //Para leer la BBDD
    //const logs = await LogModel.find();
    //console.log(logs[0].message);


    Server.start();
    //console.log( envs );
}

