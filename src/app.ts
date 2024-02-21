
import { envs } from './config/plugins/envs.plugin';
import { Server } from './presentation/server';

//Función autoinvocada
(async() => {
    main();
})();

function main() {
    Server.start();
    //console.log( envs );
}

