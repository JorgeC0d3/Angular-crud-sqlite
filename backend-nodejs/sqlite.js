import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./notes_db.db', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('¡Conectado a la base de datos SQLite!');
    }
});

// Crear una tabla si no existe
//serialize() garantiza que las consultas y operaciones que se incluyan dentro del bloque se ejecuten en orden
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT,
      date datetime,
      user TEXT
    )`);
});

export default db;