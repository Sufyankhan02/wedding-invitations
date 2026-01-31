import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root route to avoid confusion
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
        <h1>Backend API is Running ✅</h1>
        <p>This is the server that handles data storage.</p>
        <p>To view the wedding invitation, please go to:</p>
        <a href="http://localhost:5173" style="font-size: 20px; color: blue;">http://localhost:5173</a>
      </body>
    </html>
  `);
});

// Initialize SQLite database
const dbPath = path.resolve(__dirname, 'wishes.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS wishes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uid TEXT,
      name TEXT,
      message TEXT,
      attendance TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// Routes

// Get all wishes for a specific UID
app.get('/api/:uid/wishes', (req, res) => {
  const { uid } = req.params;
  const { limit = 50, offset = 0 } = req.query;

  const sql = `SELECT * FROM wishes WHERE uid = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  
  db.all(sql, [uid, limit, offset], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    
    // Get total count
    db.get(`SELECT COUNT(*) as count FROM wishes WHERE uid = ?`, [uid], (err, countResult) => {
        if (err) {
            res.json({
                success: true,
                data: rows,
                pagination: { total: rows.length, limit: parseInt(limit), offset: parseInt(offset) }
            });
        } else {
            res.json({
                success: true,
                data: rows,
                pagination: { total: countResult.count, limit: parseInt(limit), offset: parseInt(offset) }
            });
        }
    });
  });
});

// Create a new wish
app.post('/api/:uid/wishes', (req, res) => {
  const { uid } = req.params;
  const { name, message, attendance } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }

  const sql = `INSERT INTO wishes (uid, name, message, attendance) VALUES (?, ?, ?, ?)`;
  
  db.run(sql, [uid, name, message, attendance], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    // Return the created wish
    res.status(201).json({
      success: true,
      data: {
        id: this.lastID,
        uid,
        name,
        message,
        attendance,
        created_at: new Date().toISOString()
      }
    });
  });
});

// Delete a wish
app.delete('/api/:uid/wishes/:id', (req, res) => {
  const { uid, id } = req.params;
  
  const sql = `DELETE FROM wishes WHERE id = ?`;
  
  db.run(sql, [id], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    if (this.changes === 0) {
        return res.status(404).json({ error: 'Wish not found' });
    }

    res.json({
      success: true,
      message: 'Wish deleted successfully',
      id
    });
  });
});

// Mock invitation endpoint (since we use static config in frontend, this just prevents 404s)
app.get('/api/invitation/:uid', (req, res) => {
    // Return 404 so the frontend's api.js throws an error, catches it, 
    // and falls back to the static config (src/config/config.js)
    res.status(404).json({ error: 'Invitation not found in backend, using static config' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
