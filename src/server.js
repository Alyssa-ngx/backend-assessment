const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'user', // Replace with your MySQL username
    password: 'password', // Replace with your MySQL password
    database: 'backend_assessment'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database.');
});

// Add a new employee
app.post('/employees', (req, res) => {
    const { id, name, email_address, phone_number, gender } = req.body;
    db.query(
        'INSERT INTO Employees (id, name, email_address, phone_number, gender) VALUES (?, ?, ?, ?, ?)',
        [id, name, email_address, phone_number, gender],
        (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            res.status(201).json({ message: 'Employee added', id });
        }
    );
});

// Add a new cafe
app.post('/cafes', (req, res) => {
    const { name, description, location } = req.body;
    const id = uuidv4();
    db.query(
        'INSERT INTO Cafes (id, name, description, location) VALUES (?, ?, ?, ?)',
        [id, name, description, location],
        (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            res.status(201).json({ message: 'Cafe added', id });
        }
    );
});

// Assign employee to cafe
app.post('/assign', (req, res) => {
    const { employee_id, cafe_id, start_date } = req.body;
    db.query(
        'INSERT INTO EmployeeCafeMapping (employee_id, cafe_id, start_date) VALUES (?, ?, ?)',
        [employee_id, cafe_id, start_date],
        (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            res.status(201).json({ message: 'Employee assigned to cafe' });
        }
    );
});

// Get employee details with associated cafe
app.get('/employees/:id', (req, res) => {
    const { id } = req.params;
    db.query(
        `SELECT e.*, c.name as cafe_name, c.location as cafe_location
         FROM Employees e
         LEFT JOIN EmployeeCafeMapping m ON e.id = m.employee_id
         LEFT JOIN Cafes c ON m.cafe_id = c.id
         WHERE e.id = ?`,
        [id],
        (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json(result[0]);
        }
    );
});

// Get cafe details with its employees
app.get('/cafes/:id', (req, res) => {
    const { id } = req.params;
    db.query(
        `SELECT c.*, 
                JSON_ARRAYAGG(JSON_OBJECT('employee_id', e.id, 'name', e.name, 'start_date', m.start_date)) AS employees
         FROM Cafes c
         LEFT JOIN EmployeeCafeMapping m ON c.id = m.cafe_id
         LEFT JOIN Employees e ON m.employee_id = e.id
         WHERE c.id = ?
         GROUP BY c.id`,
        [id],
        (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json(result[0]);
        }
    );
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
