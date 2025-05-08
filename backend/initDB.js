const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/database.db');

db.serialize(() => {
    // Tabla empresas (existente)
    db.run(`CREATE TABLE IF NOT EXISTS empresas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        cuit TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        telefono TEXT,
        password TEXT NOT NULL
    )`, (err) => {
        if (err) console.error(err);
        else console.log('Tabla creada exitosamente');
    });
    
    // Nueva tabla estudiantes
    db.run(`CREATE TABLE IF NOT EXISTS estudiantes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        dni TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        telefono TEXT,
        password TEXT NOT NULL,
        carrera TEXT NOT NULL,
        universidad TEXT NOT NULL
    )`, (err) => {
        if (err) console.error('Error al crear tabla estudiantes:', err);
        else console.log('Tabla estudiantes creada/verificada');
    });
});

db.close();