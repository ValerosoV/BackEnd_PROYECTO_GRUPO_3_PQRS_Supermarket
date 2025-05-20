import { Router } from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/db.js'; // Asegúrate de que la ruta al archivo de configuración de la base de datos sea correcta

const router = Router();

// Registrar administrador
router.post('/admins/registrar', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar campos obligatorios
    if (!username || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO admins (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    res.status(201).json({ message: 'Administrador registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar administrador', detalle: error.message });
  }
});

// Obtener todos los administradores
router.get('/admins/obtener_todos', async (req, res) => {
  try {
    // Consulta para obtener todos los administradores (sin contraseñas)
    const [admins] = await pool.query(
      `SELECT 
        id, 
        username,
        password
       FROM admins`
    );

    // Respuesta con lista completa
    res.json({
      count: admins.length,
      data: admins
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener administradores',
      detalle: error.message
    });
  }
});

// Obtener administrador por username
router.get('/admins/obtener', async (req, res) => {
  try {
    const { username } = req.query;

    // Consulta base
    let query = `
      SELECT 
        id, 
        username,
        password
      FROM admins
    `;
    const params = [];

    // Añadir filtro si existe
    if (username) {
      query += ' WHERE username = ?';
      params.push(username);
    }

    // Ejecutar consulta
    const [admins] = await pool.query(query, params);

    // Respuesta
    res.json({
      count: admins.length,
      data: admins
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al buscar administrador',
      detalle: error.message
    });
  }
});

// Actualizar administrador
router.put('/admins/actualizar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    // Validar campos obligatorios
    if (!username) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    let query = `
      UPDATE admins 
      SET 
        username = ?
    `;
    const params = [username];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ', password = ?';
      params.push(hashedPassword);
    }

    query += ' WHERE id = ?';
    params.push(id);

    const [result] = await pool.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }

    res.json({ message: "Administrador actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar administrador
router.delete('/admins/borrar/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      'DELETE FROM admins WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }

    res.json({ message: "Administrador eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({
      error: "No se pudo eliminar el administrador",
      detalle: error.message
    });
  }
});

export default router;