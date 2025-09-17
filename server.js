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









//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------








app.get('/jpstudent', (req, res) => {
  const sql = 'SELECT * FROM stdmark ORDER BY NAME';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(data);
  });
});

app.get('/dsstudent', (req, res) => {
  const sql = 'SELECT * FROM stdmark ORDER BY NAME';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(data);
  });
});
app.get('/vccfstudent', (req, res) => {
  const sql = 'SELECT * FROM stdmark ORDER BY NAME';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(data);
  });
});
app.get('/daastudent', (req, res) => {
  const sql = 'SELECT * FROM stdmark ORDER BY NAME';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(data);
  });
});
app.get('/dpcostudent', (req, res) => {
  const sql = 'SELECT * FROM stdmark ORDER BY NAME';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(data);
  });
});









//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------







app.post('/createjp', (req, res) => {
  const { roll, jp } = req.body;

  if (!roll || jp === undefined) {
    return res.status(400).json({ error: 'Roll and JP are rwerqwrequired' });
  }

  // Update JP mark only (student already exists in stdmark)
  const updateSql = 'UPDATE stdmark SET JP = ? WHERE ROLL = ?';
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
  const updateSql = 'UPDATE stdmark SET DS = ? WHERE ROLL = ?';
  
  db.query(updateSql, [ds, roll], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Roll not found' });
    }

    res.json({ message: 'DS mark stored successfully' });
  });
});

app.post('/createvccf', (req, res) => {
  const { roll, vccf } = req.body;

  if (!roll || vccf === undefined) {
    return res.status(400).json({ error: 'Roll and VCCF are required' });
  }

  // Update JP mark only (student already exists in stdmark)
  const updateSql = 'UPDATE stdmark SET VCCF = ? WHERE ROLL = ?';
  
  db.query(updateSql, [vccf, roll], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Roll not found' });
    }

    res.json({ message: 'VCCF mark stored successfully' });
  });
});

app.post('/createdaa', (req, res) => {
  const { roll, daa } = req.body;

  if (!roll || daa === undefined) {
    return res.status(400).json({ error: 'Roll and VCCF are required' });
  }

  // Update JP mark only (student already exists in stdmark)
  const updateSql = 'UPDATE stdmark SET DAA = ? WHERE ROLL = ?';
  
  db.query(updateSql, [daa, roll], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Roll not found' });
    }

    res.json({ message: 'DAA mark stored successfully' });
  });
});

app.post('/createdpco', (req, res) => {
  const { roll, dpco } = req.body;

  if (!roll || dpco === undefined) {
    return res.status(400).json({ error: 'Roll and DPCO are required' });
  }

  // Update JP mark only (student already exists in stdmark)
  const updateSql = 'UPDATE stdmark SET DPCO = ? WHERE ROLL = ?';
  
  db.query(updateSql, [dpco, roll], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Roll not found' });
    }

    res.json({ message: 'DPCO mark stored successfully' });
  });
});





//------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------








app.delete('/deletejp/:roll', (req, res) => {
  const { roll } = req.params;

  const sqlUpdate = 'UPDATE stdmark SET JP = NULL WHERE ROLL = ?';
  db.query(sqlUpdate, [roll], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });

    // Then fetch the updated row and return it
    const sqlSelect = 'SELECT ROLL, NAME, JP FROM stdmark WHERE ROLL = ?';
    db.query(sqlSelect, [roll], (err, rows) => {
      if (err) return res.status(500).json({ error: 'Fetch failed' });

      res.json({
        message: 'JP mark deleted (set to NULL) successfully',
        student: rows[0]   // return the updated student row
      });
    });
  });
});




app.delete('/deleteds/:roll', (req, res) => {
  const { roll } = req.params;

  // First update JP = NULL
  const sqlUpdate = 'UPDATE stdmark SET DS = NULL WHERE ROLL = ?';
  db.query(sqlUpdate, [roll], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });

    // Then fetch the updated row and return it
    const sqlSelect = 'SELECT ROLL, NAME, DS FROM stdmark WHERE ROLL = ?';
    db.query(sqlSelect, [roll], (err, rows) => {
      if (err) return res.status(500).json({ error: 'Fetch failed' });

      res.json({
        message: 'DS mark deleted (set to NULL) successfully',
        student: rows[0]   // return the updated student row
      });
    });
  });
});

app.delete('/deletevccf/:roll', (req, res) => {
  const { roll } = req.params;

  // First update JP = NULL
  const sqlUpdate = 'UPDATE stdmark SET VCCF = NULL WHERE ROLL = ?';
  db.query(sqlUpdate, [roll], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });

    // Then fetch the updated row and return it
    const sqlSelect = 'SELECT ROLL, NAME, VCCF FROM stdmark WHERE ROLL = ?';
    db.query(sqlSelect, [roll], (err, rows) => {
      if (err) return res.status(500).json({ error: 'Fetch failed' });

      res.json({
        message: 'VCCF mark deleted (set to NULL) successfully',
        student: rows[0]   // return the updated student row
      });
    });
  });
});


app.delete('/deletedaa/:roll', (req, res) => {
  const { roll } = req.params;

  // First update JP = NULL
  const sqlUpdate = 'UPDATE stdmark SET DAA = NULL WHERE ROLL = ?';
  db.query(sqlUpdate, [roll], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });

    // Then fetch the updated row and return it
    const sqlSelect = 'SELECT ROLL, NAME, DAA FROM stdmark WHERE ROLL = ?';
    db.query(sqlSelect, [roll], (err, rows) => {
      if (err) return res.status(500).json({ error: 'Fetch failed' });

      res.json({
        message: 'DAA mark deleted (set to NULL) successfully',
        student: rows[0]   // return the updated student row
      });
    });
  });
});


app.delete('/deletedpco/:roll', (req, res) => {
  const { roll } = req.params;

  // First update JP = NULL
  const sqlUpdate = 'UPDATE stdmark SET DPCO = NULL WHERE ROLL = ?';
  db.query(sqlUpdate, [roll], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Student not found' });

    // Then fetch the updated row and return it
    const sqlSelect = 'SELECT ROLL, NAME, DPCO FROM stdmark WHERE ROLL = ?';
    db.query(sqlSelect, [roll], (err, rows) => {
      if (err) return res.status(500).json({ error: 'Fetch failed' });

      res.json({
        message: 'DPCO mark deleted (set to NULL) successfully',
        student: rows[0]   // return the updated student row
      });
    });
  });
});





//--------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------












app.delete('/delete-alljp', (req, res) => {
  const sql = 'UPDATE stdmark SET JP = NULL';

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete all failed' });

    res.json({ message: 'All JP marks set to NULL successfully' });
  });
});


app.delete('/delete-allds', (req, res) => {
  const sql = 'UPDATE stdmark SET DS = NULL';

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete all failed' });

    res.json({ message: 'All DS marks set to NULL successfully' });
  });
});

app.delete('/delete-allvccf', (req, res) => {
  const sql = 'UPDATE stdmark SET VCCF = NULL';

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete all failed' });

    res.json({ message: 'All VCCF marks set to NULL successfully' });
  });
});

app.delete('/delete-alldaa', (req, res) => {
  const sql = 'UPDATE stdmark SET DAA = NULL';

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete all failed' });

    res.json({ message: 'All DAA marks set to NULL successfully' });
  });
});

app.delete('/delete-alldpco', (req, res) => {
  const sql = 'UPDATE stdmark SET DPCO = NULL';

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete all failed' });

    res.json({ message: 'All DPCO marks set to NULL successfully' });
  });
});






//------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------





// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
