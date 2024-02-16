
import { Server } from './presentation/server';

//Función autoinvocada
(async() => {
    main();
})();

function main() {
    Server.start();
}

