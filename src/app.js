import express from 'express';                          //framework
import clientesRouter from './routes/clientes.js';      //peticiones de Cliente
import radicadosRouter from './routes/radicados.js';    //peticiones de Radicado
import adminsRouter from './routes/admins.js';          //peticiones de Admin

import authClientsRouter from './authParaRoutes/authClientes.js';//peticiones de Auth
import authAdminsRouter from './authParaRoutes/authAdmins.js';   //peticiones de Auth  

import multer from 'multer';                            //paquete para gesionar almacenamiento de archivos   
import { v4 as uuidv4 } from 'uuid';                    //paquete para identiciador unico  

const app = express();      // Crear una instancia de la app con Express
app.use(express.json());    // Middleware para parsear con JSON

// Configuración de Multer (para PDFs)
const storage = multer.diskStorage({
  // Configuración del almacenamiento en la carpeta 'upload'
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Genera un filename unico con uuidv4() para el pdf con la extension original
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});
const upload = multer({ storage });

// Rutas de las Tablas
app.use('/api', clientesRouter);
app.use('/api', adminsRouter);                            // Rutas de Admin
app.use('/api', upload.single('anexo'), radicadosRouter); // Rutas de Radicados usando multer para subir direcciones de archivos

// Rutas de autenticación
app.use('/api', authAdminsRouter);
app.use('/api', authClientsRouter); 

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Servidor en http://localhost:'+`${PORT}`);
});