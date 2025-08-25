const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createPool({
  connectionLimit: 10,
  host: "bvndchju89az6yxafdyp-mysql.services.clever-cloud.com",
  user: "uxi2wilwkt7cxwqu",
  password: "Lg6yd2gGPIQPIEpV8HTK",
  database: "bvndchju89az6yxafdyp",
  port: 3306,
});


db.getConnection((err, connection) => {
  if (err) console.error('DB connection failed:', err);
  else {
    console.log('Connected to MySQL');
    connection.release();
  }
});

// Get all students from stdmark
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM stdmark ORDER BY NAME';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(data);
  });
});

// Create student in stdmark
app.post('/create', (req, res) => {
  const { name, roll, jp, ds, vccf, daa, dpco } = req.body;
  if (!name || !roll) return res.status(400).json({ error: 'Name and Roll required' });

  const sql = 'INSERT INTO stdmark (NAME, ROLL, JP, DS, VCCF, DAA, DPCO) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [name.trim(), roll.trim(), jp || null, ds || null, vccf || null, daa || null, dpco || null];

  db.query(sql, values, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Student exists' });
      return res.status(500).json({ error: 'Insert failed' });
    }
    res.json({ message: 'Success', id: result.insertId });
  });
});
















// Get JP students from submark
app.get('/jpstudent', (req, res) => {
  const sql = 'SELECT * FROM submark ORDER BY NAME';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(data);
  });
});

app.get('/dsstudent', (req, res) => {
  const sql = 'SELECT * FROM submark ORDER BY NAME';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(data);
  });
});


















app.post('/createjp', (req, res) => {
  const { roll, jp } = req.body;

  if (!roll || jp === undefined) {
    return res.status(400).json({ error: 'Roll and JP are rwerqwrequired' });
  }

  // Update JP mark only (student already exists in stdmark)
  const updateSql = 'UPDATE submark SET JP = ? WHERE ROLL = ?';
  console.log("vdhbsjk");
  db.query(updateSql, [jp, roll], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Roll not found' });
    }

    res.json({ message: 'JP mark stored successfully' });
  });
});



app.post('/createds', (req, res) => {
  const { roll, ds } = req.body;

  if (!roll || ds === undefined) {
    return res.status(400).json({ error: 'Roll and DS are required' });
  }

  // Update JP mark only (student already exists in stdmark)
  const updateSql = 'UPDATE submark SET DS = ? WHERE ROLL = ?';
  console.log("vdhbsjk");
  db.query(updateSql, [ds, roll], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Roll not found' });
    }

    res.json({ message: 'DS mark stored successfully' });
  });
});














// Delete single JP student
app.delete('/deletejp/:roll', (req, res) => {
  const { roll } = req.params;
  const sql = 'DELETE FROM submark WHERE ROLL = ?';
  db.query(sql, [roll], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Deleted successfully' });
  });
});


app.delete('/deleteds/:roll', (req, res) => {
  const { roll } = req.params;
  const sql = 'DELETE FROM submark WHERE ROLL = ?';
  db.query(sql, [roll], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Deleted successfully' });
  });
});


















// Delete all JP students
app.delete('/delete-alljp', (req, res) => {
  const sql = 'DELETE FROM submark';
  db.query(sql, (err) => {
    if (err) return res.status(500).json({ error: 'Delete all failed' });
    res.json({ message: 'All JP students deleted successfully' });
  });
});

app.delete('/delete-allds', (req, res) => {
  const sql = 'DELETE FROM submark';
  db.query(sql, (err) => {
    if (err) return res.status(500).json({ error: 'Delete all failed' });
    res.json({ message: 'All DS students deleted successfully' });
  });
});












// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
