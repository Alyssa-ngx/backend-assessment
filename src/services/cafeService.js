const db = require('../config/database');

exports.getCafes = async (location) => {
  let query = `SELECT c.*, COUNT(e.id) as employees FROM Cafes c
               LEFT JOIN EmployeeCafeMapping m ON c.id = m.cafe_id
               LEFT JOIN Employees e ON m.employee_id = e.id`;
  if (location) {
    query += ` WHERE c.location = ?`;
  }
  query += ` GROUP BY c.id ORDER BY employees DESC`;
  const [rows] = await db.execute(query, location ? [location] : []);
  return rows;
};

exports.createCafe = async (name, description, location) => {
  const id = require('uuid').v4();
  const query = `INSERT INTO Cafes (id, name, description, location) VALUES (?, ?, ?, ?)`;
  await db.execute(query, [id, name, description, location]);
  return { id, name, description, location };
};

const db = require('../config/database'); 
const { v4: uuidv4 } = require('uuid');

exports.createCafe = async (name, description, location) => {
  const id = uuidv4(); 
  const query = `INSERT INTO Cafes (id, name, description, location) VALUES (?, ?, ?, ?)`;
  await db.execute(query, [id, name, description, location]);
  return { id, name, description, location };
};

exports.updateCafe = async (id, name, description, location) => {
  const query = `UPDATE Cafes SET name = ?, description = ?, location = ? WHERE id = ?`;
  const [result] = await db.execute(query, [name, description, location, id]);

  if (result.affectedRows === 0) {
    return null;
  }

  return { id, name, description, location };
};

exports.deleteCafe = async (id) => {

  const query = `DELETE FROM Cafes WHERE id = ?`;
  const [result] = await db.execute(query, [id]);

  if (result.affectedRows === 0) {
    return null;
  }

  return true;
};

