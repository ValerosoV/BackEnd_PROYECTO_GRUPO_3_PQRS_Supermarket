const express = require("express");
const router = express.Router(); // Manejador de rutas de Express

/* 
const ContenidoSchema = require("../models/contenidos"); // Importar el esquema respectivo archivo en la carpeta de modelos
*/


/*
// Endpoint para crear un nuevo contenido
router.post("/noc/crear",(req, res) => {

    // Crear una nueva instancia del modelo ContenidoSchema con los datos recibidos en la solicitud

    const nuevoContenido = ContenidoSchema(req.body);
    nuevoContenido
        .save()                                             // Guardar el nuevo contenido en la base de datos
        .then((data) => res.json(data))                     // Enviar la respuesta con los datos del nuevo contenido
        .catch((error) => res.json({ message: error }));    // Enviar la respuesta con un mensaje de error si ocurre alguno
});

// Endpoint para obtener todos los contenidos
router.get("/noc/buscar", verifyToken, (req, res) => {
    // Buscar todos los contenidos en la base de datos
    ContenidoSchema.find()
        .then((data) => res.json(data))                  // Enviar la respuesta con los contenidos encontrados
        .catch((error) => res.json({ message: error })); // Enviar la respuesta con un mensaje de error si ocurre alguno
});

// Endpoint para obtener un contenido por su ID
router.get("/contenido/buscar/:id", verifyToken, (req, res) => {
    const { id } = req.params;                              // Obtener el ID del contenido de los parámetros de la URL
    // Buscar un contenido por su ID en la base de datos
    ContenidoSchema
        .findById(id)
        .then((data) => res.json(data))                     // Enviar la respuesta con el contenido encontrado
        .catch((error) => res.json({ message: error }));    // Enviar la respuesta con un mensaje de error si ocurre alguno
});

// Endpoint para modificar un contenido por su ID
router.put("/contenido/modificar/:id", verifyToken, (req, res) => {
    const { id } = req.params;                                                                            // Obtener el ID del contenido de los parámetros de la URL
    const { realidadVirtual, simulacion, articulos, cursos, tutoriales, titulo, descripcion } = req.body; // Obtener los datos actualizados del contenido de la solicitud
    // Actualizar el contenido en la base de datos
    ContenidoSchema
        .updateOne({ _id: id }, {
            $set: { realidadVirtual, simulacion, articulos, cursos, tutoriales, titulo, descripcion }
        })
        .then((data) => res.json(data))                     // Enviar la respuesta con los datos de la actualización
        .catch((error) => res.json({ message: error }));    // Enviar la respuesta con un mensaje de error si ocurre alguno
});

// Endpoint para eliminar un contenido por su ID
router.delete("/contenido/eliminar/:id", verifyToken, (req, res) => {
    const { id } = req.params;                                      // Obtener el ID del contenido de los parámetros de la URL
    // Buscar y eliminar un contenido por su ID en la base de datos
    ContenidoSchema
        .findByIdAndDelete(id)
        .then((data) => {
            res.json(data);                                         // Enviar la respuesta con los datos del contenido eliminado
        })
        .catch((error) => {
            res.json({ message: error });                           // Enviar la respuesta con un mensaje de error si ocurre alguno
        });
});

*/

module.exports = router; // Exportar las Rutas para su uso en otros archivos