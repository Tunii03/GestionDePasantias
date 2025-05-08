import express from 'express';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('c:\\Users\\Tuni\\Desktop\\GestionDePasantias\\src\\database.db', 
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE | sqlite3.OPEN_FULLMUTEX, 
    (err) => {
        if (err) {
            console.error('Error al abrir la base de datos:', err.message);
            // Forzar recreación del archivo si está corrupto
            fs.unlinkSync('c:\\Users\\Tuni\\Desktop\\GestionDePasantias\\src\\database.db');
            process.exit(1);
        }
        console.log('Conexión exitosa a SQLite');
    });

// Añadir al inicio del archivo
import fs from 'fs';

// Añade manejo de cierre adecuado
process.on('SIGINT', () => {
    db.close();
    process.exit();
});

// Crear tabla empresas
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS empresas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        cuit TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        telefono TEXT,
        password TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error al crear tabla:', err);
        } else {
            console.log('Tabla empresas verificada/creada');
        }
    });
});

// Endpoint de registro
app.post('/registro-empresa', (req, res) => {
  const { nombre, cuit, email, telefono = '', password } = req.body;
  
  // Validaciones
  if (!nombre || !cuit || !email || !password) {
    return res.status(422).json({ error: 'Todos los campos son requeridos' });
  }
  if (!/^\d{11}$/.test(cuit)) {
    return res.status(422).json({ error: 'CUIT inválido (11 dígitos requeridos)' });
  }
  if (password.length < 6) {
    return res.status(422).json({ error: 'Contraseña muy corta (mínimo 6 caracteres)' });
  }

  db.run(
    'INSERT INTO empresas (nombre, cuit, email, telefono, password) VALUES (?, ?, ?, ?, ?)',
    [nombre, cuit, email, telefono, password],
    function(err) {
      if (err) {
        return res.status(400).json({ error: 'El CUIT o email ya existen' });
      }
      res.json({ mensaje: 'Empresa registrada exitosamente' });
    }
  );
});

// Endpoint de registro estudiante
app.post('/registro-estudiante', (req, res) => {
  const { nombre, dni, email, telefono = '', password, carrera, universidad } = req.body;
  
  // Validaciones
  if (!nombre || !dni || !email || !password || !carrera || !universidad) {
    return res.status(422).json({ error: 'Todos los campos son requeridos' });
  }
  if (!/^\d{8}$/.test(dni)) {
    return res.status(422).json({ error: 'DNI inválido (8 dígitos requeridos)' });
  }

  db.run(
    'INSERT INTO estudiantes (nombre, dni, email, telefono, password, carrera, universidad) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nombre, dni, email, telefono, password, carrera, universidad],
    function(err) {
      if (err) {
        return res.status(400).json({ error: 'El DNI o email ya existen' });
      }
      res.json({ mensaje: 'Estudiante registrado exitosamente' });
    }
  );
});

// Endpoint de login estudiante
app.post('/login-estudiante', (req, res) => {
  const { email, password } = req.body;
  
  db.get(
    'SELECT id, nombre FROM estudiantes WHERE email = ? AND password = ?',
    [email, password],
    (err, row) => {
      if (err || !row) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      res.json({ 
        mensaje: 'Login exitoso',
        usuario: row 
      });
    }
  );
});

// Iniciar servidor
app.listen(8000, () => {
  console.log('Servidor Node.js corriendo en http://localhost:8000');
});