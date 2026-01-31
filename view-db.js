import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'wishes.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
    return;
  }
});

console.log('--- Current Wishes in Database ---');
db.all(`SELECT * FROM wishes`, [], (err, rows) => {
  if (err) {
    throw err;
  }
  if (rows.length === 0) {
    console.log('No wishes found yet.');
  } else {
    console.table(rows);
  }
  db.close();
});
