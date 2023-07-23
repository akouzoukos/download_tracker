// server.js
const express = require('express');
const app = express();
const db = require('./database');

// Middleware to parse JSON in request bodies
app.use(express.json());

// Endpoint to get the current download count
app.get('/downloads', (req, res) => {
  db.get('SELECT count FROM downloads', (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ count: row.count });
  });
});

// Endpoint to increment the download count
app.post('/downloads', (req, res) => {
  db.run('UPDATE downloads SET count = count + 1', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Download count updated successfully' });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
