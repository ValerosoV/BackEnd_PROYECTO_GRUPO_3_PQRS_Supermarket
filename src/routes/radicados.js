import { Router } from 'express';
import pool from '../config/db.js'; // Asegúrate de que la ruta al archivo de configuración de la base de datos sea correcta
import { v4 as uuidv4 } from 'uuid'; // Importa uuid para generar el número de radicado

const router = Router();

// Función para generar un número de radicado único
const generarNumRadic = () => {
    return `RAD-${uuidv4().substring(0, 8)}`; // Prefijo "RAD-" y los primeros 8 caracteres del UUID
};

// Registrar radicado
router.post('/radicados/registrar', async (req, res) => {
    try {
        const { tipo_radicado, comentarios, anexo, cliente_id } = req.body;
        const numero_radicado = generarNumRadic(); // Generar número de radicado

        // Validar campos obligatorios
        if (!tipo_radicado) {
            return res.status(400).json({ error: "Falta el tipo de radicado" });
        }
        if (!cliente_id) {
            return res.status(400).json({ error: "Falta el cliente_id" });
        }

        // Insertar radicado por defecto en estado "Pendiente" como Cliente, no pide justificación, usa timeStamp 
        await pool.query(
            'INSERT INTO radicados (numero_radicado, tipo_radicado, comentarios, anexo, cliente_id) VALUES (?, ?, ?, ?, ?)',
            [numero_radicado, tipo_radicado, comentarios, anexo, cliente_id]
        );

        res.status(201).json({ message: 'Radicado registrado exitosamente', numero_radicado });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar radicado', detalle: error.message });
    }
});

// Obtener todos los radicados
router.get('/radicados/obtener_todos', async (req, res) => {
    try {
        const [radicados] = await pool.query(`
      SELECT 
        id,
        numero_radicado,
        fecha_radicado,
        tipo_radicado,
        comentarios,
        anexo,
        estado,
        justificacion_estado,
        cliente_id
      FROM radicados
    `);

        res.json({ count: radicados.length, data: radicados });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener radicados', detalle: error.message });
    }
});


//Obtener radicado por numero de radicado
router.get('/radicados/obtener', async (req, res) => {
    try {
        const { numero_radicado } = req.query;

        let query = `
      SELECT 
        id,
        numero_radicado,
        fecha_radicado,
        tipo_radicado,
        comentarios,
        anexo,
        estado,
        justificacion_estado,
        cliente_id
      FROM radicados
    `;
        const params = [];

        if (numero_radicado) {
            query += ' WHERE numero_radicado = ?';
            params.push(numero_radicado);
        }

        const [radicados] = await pool.query(query, params);

        res.json({ count: radicados.length, data: radicados });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener radicado', detalle: error.message });
    }
});

// Obtener radicado por tipo_radicado
router.get('/radicados/por_tipo', async (req, res) => {
  try {
    const { tipo_radicado } = req.query;

    // Validar que el tipo_radicado sea uno de los valores permitidos
    const tiposPermitidos = ['Peticion', 'Queja', 'Reclamo', 'Sugerencia'];
    if (!tiposPermitidos.includes(tipo_radicado)) {
      return res.status(400).json({ error: 'Tipo de radicado no válido' });
    }

    const [radicados] = await pool.query(
      `SELECT * FROM radicados WHERE tipo_radicado = ?`,
      [tipo_radicado]
    );

    res.json({ count: radicados.length, data: radicados });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener radicados por tipo', detalle: error.message });
  }
});

// Obtener radicado por estado
router.get('/radicados/por_estado', async (req, res) => {
  try {
    const { estado } = req.query;

    // Validar que el estado sea uno de los valores permitidos
    const estadosPermitidos = ['Nuevo', 'En proceso', 'Resuelto', 'Rechazado'];
    if (!estadosPermitidos.includes(estado)) {
      return res.status(400).json({ error: 'Estado de radicado no válido' });
    }

    const [radicados] = await pool.query(
      `SELECT * FROM radicados WHERE estado = ?`,
      [estado]
    );

    res.json({ count: radicados.length, data: radicados });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener radicados por estado', detalle: error.message });
  }
});

// Obtener radicado por tipo_radicado y estado
router.get('/radicados/por_tipo_y_estado', async (req, res) => {
  try {
    const { tipo_radicado, estado } = req.query;

    // Validar que tipo_radicado y estado sean valores permitidos
    const tiposPermitidos = ['Peticion', 'Queja', 'Reclamo', 'Sugerencia'];
    const estadosPermitidos = ['Nuevo', 'En proceso', 'Resuelto', 'Rechazado'];

    if (!tiposPermitidos.includes(tipo_radicado) || !estadosPermitidos.includes(estado)) {
      return res.status(400).json({ error: 'Tipo de radicado o estado no válido' });
    }

    const [radicados] = await pool.query(
      `SELECT * FROM radicados WHERE tipo_radicado = ? AND estado = ?`,
      [tipo_radicado, estado]
    );

    res.json({ count: radicados.length, data: radicados });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener radicados por tipo y estado', detalle: error.message });
  }
});
// Obtener radicado por cliente_id
router.get('/radicados/por_cliente', async (req, res) => {
  try {
    const { cliente_id } = req.query;

    const [radicados] = await pool.query(
      `SELECT * FROM radicados WHERE cliente_id = ?`,
      [cliente_id]
    );

    res.json({ count: radicados.length, data: radicados });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener radicados por cliente', detalle: error.message });
  }
});

// Actualizar radicado
router.put('/radicados/actualizar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo_radicado, comentarios, anexo, estado, justificacion_estado, cliente_id } = req.body;

        // Validar campos obligatorios
        if (!tipo_radicado || !estado) {
            return res.status(400).json({ error: "Faltan campos obligatorios (tipo_radicado, estado)" });
        }

        const [result] = await pool.query(
            `UPDATE radicados 
       SET 
         tipo_radicado = ?, 
         comentarios = ?, 
         anexo = ?, 
         estado = ?, 
         justificacion_estado = ?,
         cliente_id = ?
       WHERE id = ?`,
            [tipo_radicado, comentarios, anexo, estado, justificacion_estado, cliente_id, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Radicado no encontrado" });
        }

        res.json({ message: "Radicado actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar radicado', detalle: error.message });
    }
});

// Eliminar radicado
router.delete('/radicados/borrar/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            'DELETE FROM radicados WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Radicado no encontrado" });
        }

        res.json({ message: "Radicado eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar radicado', detalle: error.message });
    }
});

export default router;
