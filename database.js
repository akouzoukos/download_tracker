const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('downloads.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS downloads (count INTEGER)');
  db.run('INSERT INTO downloads (count) VALUES (0)');
});

module.exports = db;
