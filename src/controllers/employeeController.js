const employeeService = require('../services/employeeService');


exports.createEmployee = async (req, res) => {
  const { id, name, email_address, phone_number, gender, cafe_id, start_date } = req.body;
  try {
    const employee = await employeeService.createEmployee(
      id,
      name,
      email_address,
      phone_number,
      gender,
      cafe_id,
      start_date
    );
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateEmployee = async (req, res) => {
  const { id } = req.params; 
  const { name, email_address, phone_number, gender, cafe_id, start_date } = req.body; // Extract request body
  try {
    const updatedEmployee = await employeeService.updateEmployee(
      id,
      name,
      email_address,
      phone_number,
      gender,
      cafe_id,
      start_date
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params; 
  try {
    const deletedEmployee = await employeeService.deleteEmployee(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' }); 
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
