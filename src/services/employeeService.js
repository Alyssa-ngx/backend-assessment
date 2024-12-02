exports.getEmployees = async (cafe) => {
  let query = `SELECT e.*, DATEDIFF(CURDATE(), m.start_date) as days_worked, c.name as cafe FROM Employees e
               LEFT JOIN EmployeeCafeMapping m ON e.id = m.employee_id
               LEFT JOIN Cafes c ON m.cafe_id = c.id`;
  if (cafe) {
    query += ` WHERE c.name = ?`;
  }
  query += ` ORDER BY days_worked DESC`;
  const [rows] = await db.execute(query, cafe ? [cafe] : []);
  return rows;
};

// Add other methods for create, update, delete
