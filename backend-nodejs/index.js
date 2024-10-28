import express from 'express';
import cors from 'cors';
import db from './sqlite.js';

const port = 4000;
const app = express();

app.use(express.json()); // Para parsear JSON en peticiones POST
app.use(cors()); // Para permitir que tu frontend en Angular se comunique con el backend en Node.js

// Obtener todas las notas
app.get('/api/notes', (req, res) => {
    const sql = `SELECT * FROM notes`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
        console.log(rows);
    });
});

// Insertar una nota
app.post('/api/savenote', (req, res) => {
    const { content, user } = req.body; // No recibimos 'date' desde el cliente
    const date = new Date().toISOString(); // Generar la fecha actual en formato ISO
    const sql = `INSERT INTO notes (content, user, date) VALUES (?, ?, ?)`;
    const params = [content, user, date];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Obtener una nota por su ID
app.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM notes WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        res.json(row);
    });
});

// Modificar una nota por su ID
app.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const sql = `UPDATE notes SET content = ? WHERE id = ?`;
    const params = [content, id];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        res.json({ message: 'Nota actualizada correctamente' });
    });
});

// Eliminar una nota por su ID
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM notes WHERE id = ?`;

    db.run(sql, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        res.json({ message: 'Nota eliminada correctamente' });
    });
});


app.get('/', (req, res) => {
    res.send('API REST Angular-NodeJS');
});

app.listen(port, () => {
    console.log(`Server run in http://localhost:${port}`);
});