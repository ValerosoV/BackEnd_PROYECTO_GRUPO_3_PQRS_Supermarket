import { Router } from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// ----------------------------------------
// Endpoint para login de gestores
// ----------------------------------------
router.post('/login', async (req, res) => {
  try {
    const { numero_identificacion, contrasena } = req.body;

    // Validar campos requeridos
    if (!numero_identificacion || !contrasena) {
      return res.status(400).json({ error: 'Faltan credenciales' });
    }

    // Buscar usuario en la base de datos

    //if()
    
    const [users] = await pool.query(
      'SELECT * FROM clientes WHERE numero_identificacion = ?',
      [numero_identificacion]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    const validContrasena = await bcrypt.compare(contrasena, users[0].contrasena);
    if (!validContrasena) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar y guardar token
    const token = uuidv4();
    await pool.query(
      'UPDATE clientes SET token = ? WHERE id = ?',
      [token, users[0].id]
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ----------------------------------------
// Middleware de autenticación (para usar en otras rutas)
// ----------------------------------------
export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    // Verificar token en la base de datos
    const [user] = await pool.query(
      'SELECT * FROM clientes WHERE token = ?',
      [token]
    );

    if (user.length === 0) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.user = user[0]; // Adjuntar datos del usuario a la solicitud
    next();

  } catch (error) {
    res.status(500).json({ error: 'Error de autenticación' });
  }
};

// ----------------------------------------
// Endpoint para logout (opcional)
// ----------------------------------------
router.post('/logout', authenticate, async (req, res) => {
  try {
    await pool.query(
      'UPDATE clientes SET token = NULL WHERE id = ?',
      [req.user.id]
    );
    res.json({ message: 'Sesión cerrada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;