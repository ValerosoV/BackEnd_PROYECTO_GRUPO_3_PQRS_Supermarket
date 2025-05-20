import { Router } from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/db.js';

const router = Router();

// Registrar cliente
router.post('/clientes/regis', async (req, res) => {
  try {
    const { tipo_identificacion, numero_identificacion, nombre_completo, correo_electronico, telefono_movil, contrasena } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    await pool.query(
      'INSERT INTO clientes SET ?',
      { tipo_identificacion, numero_identificacion, nombre_completo, correo_electronico, telefono_movil, contrasena: hashedPassword }
    );

    res.status(201).json({ message: 'Cliente registrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Obtener todos los clientes
router.get('/clientes/obtener_todos', async (req, res) => {
  try {
    // Consulta para obtener todos los clientes (sin contraseñas)
    const [clientes] = await pool.query(
      `SELECT 
        id, 
        tipo_identificacion, 
        numero_identificacion, 
        nombre_completo, 
        correo_electronico, 
        telefono_movil 
       FROM clientes`
    );

    // Respuesta con lista completa
    res.json({
      count: clientes.length,
      data: clientes
    });

  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener clientes',
      detalle: error.message
    });
  }
});
// Obtener cliente por número de identificación
router.get('/clientes/obtener', async (req, res) => {
  try {
    const { numero_identificacion } = req.query;

    // Consulta base
    let query = `
      SELECT 
        id, 
        tipo_identificacion, 
        numero_identificacion, 
        nombre_completo, 
        correo_electronico, 
        telefono_movil 
      FROM clientes
    `;

    const params = [];

    // Añadir filtro si existe
    if (numero_identificacion) {
      query += ' WHERE numero_identificacion = ?';
      params.push(numero_identificacion);
    }

    // Ejecutar consulta
    const [clientes] = await pool.query(query, params);

    // Respuesta
    res.json({
      count: clientes.length,
      data: clientes
    });

  } catch (error) {
    res.status(500).json({
      error: 'Error al buscar cliente',
      detalle: error.message
    });
  }
});
// Actualizar cliente
router.put('/clientes/actualizar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      tipo_identificacion, 
      numero_identificacion, 
      nombre_completo, 
      correo_electronico, 
      telefono_movil 
    } = req.body;

    // Validar campos obligatorios
    if (!tipo_identificacion || !numero_identificacion || !nombre_completo || !correo_electronico) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const [result] = await pool.query(
      `UPDATE clientes 
       SET 
         tipo_identificacion = ?, 
         numero_identificacion = ?, 
         nombre_completo = ?, 
         correo_electronico = ?, 
         telefono_movil = ? 
       WHERE id = ?`,
      [tipo_identificacion, numero_identificacion, nombre_completo, correo_electronico, telefono_movil, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json({ message: "Cliente actualizado exitosamente" });

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: "El número de identificación ya existe" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Eliminar cliente
router.delete('/clientes/borrar/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM clientes WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    res.json({ message: "Cliente eliminado exitosamente" });

  } catch (error) {
    res.status(500).json({ 
      error: "No se pudo eliminar el cliente",
      detalle: error.message 
    });
  }
});

export default router;