
const app = require('./app');
require('./database');


//Aqui se cambio el puerto 3000 
//que viene por defecto por el puerto 8124
async function init(){
    await app.listen(8124, "127.0.0.1");
    console.log("Server on port 3000");
}

init();
