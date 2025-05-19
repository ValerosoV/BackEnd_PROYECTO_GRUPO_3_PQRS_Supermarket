import express from 'express';                          //framework
import clientesRouter from './routes/clientes.js';      //peticiones de Cliente
//import radicadosRouter from './routes/radicados.js';
import authRouter from './routes/auth.js';              //peticiones de Auth  
import multer from 'multer';                            //algo pra gesionar almacenamiento de archivos   
import { v4 as uuidv4 } from 'uuid';                    //identiciador unico  

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

// Rutas
app.use('/api', clientesRouter);
//app.use('/radicados', upload.single('anexo'), radicadosRouter); // Multer solo aquí
app.use('/api', authRouter);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Servidor en http://localhost:'+`${PORT}`);
});