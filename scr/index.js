const parser = require("body-parser");  // Requiere el módulo body-parser para analizar las solicitudes entrantes.

// Crea una nueva aplicación Express.
const express = require('express');     
const app = express();      
const port = 3000;                      // Define el puerto en el que la aplicación escuchará las solicitudes.

/* abajo de esto estaran los archivos de las Rutas que recibiran las peticiones*/

//const No_c_que_Routes = require("./routes/No_c_que"); 
//
//etc, etc,

// Middleware para analizar solicitudes codificadas en URL Rest.
app.use(parser.urlencoded({ extended: false }));
// Middleware para analizar solicitudes en formato JSON en el bodyparser
app.use(parser.json());

/* Gestión de las rutas usando el middleware.*/
//app.use("/api", No_c_que_Routes);
//
//etc, etc,

// Middleware para analizar solicitudes en formato JSON pero en Expres
app.use(express.json());

/*lo q necesitemos para conectar con La BD de Mysql*/



app.listen(port, () => {
    console.log(`El Backend recibe por puerto: ${port}`); //mire la linea 6 de este archivo
    console.log(`http://localhost:${port}`);    
    console.log(`http://localhost:${port}/api`);
});