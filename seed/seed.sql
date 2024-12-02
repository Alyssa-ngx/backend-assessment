-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS backend_assessment;

-- Use the database
USE backend_assessment;

-- Drop existing tables if needed (optional, for development only)
DROP TABLE IF EXISTS EmployeeCafeMapping;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Cafes;

-- Create the Employees table
CREATE TABLE Employees (
    id VARCHAR(9) PRIMARY KEY, -- Format: UIXXXXXXX
    name VARCHAR(255) NOT NULL,
    email_address VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(8) NOT NULL UNIQUE, -- Singapore phone numbers start with 8 or 9
    gender ENUM('Male', 'Female') NOT NULL
);

-- Create the Cafes table
CREATE TABLE Cafes (
    id CHAR(36) PRIMARY KEY, -- UUID for unique identification
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    logo BLOB NULL,
    location VARCHAR(255) NOT NULL
);

-- Create a table to map employees to cafes
CREATE TABLE EmployeeCafeMapping (
    employee_id VARCHAR(9) NOT NULL,
    cafe_id CHAR(36) NOT NULL,
    start_date DATE NOT NULL,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (employee_id) REFERENCES Employees(id) ON DELETE CASCADE,
    FOREIGN KEY (cafe_id) REFERENCES Cafes(id) ON DELETE CASCADE
);

-- Insert sample data into Employees table
INSERT INTO Employees (id, name, email_address, phone_number, gender) VALUES
('UI1234567', 'John Doe', 'john.doe@example.com', '91234567', 'Male'),
('UI1234568', 'Jane Smith', 'jane.smith@example.com', '82345678', 'Female'),
('UI1234569', 'Alice Tan', 'alice.tan@example.com', '92345678', 'Female'),
('UI1234570', 'Bob Lim', 'bob.lim@example.com', '91345678', 'Male');

-- Insert sample data into Cafes table
INSERT INTO Cafes (id, name, description, location) VALUES
(UUID(), 'Cafe Latte', 'A cozy coffee shop.', 'Downtown'),
(UUID(), 'Cafe Mocha', 'Best espresso in town.', 'Uptown'),
(UUID(), 'Cafe Americano', 'Classic American coffee.', 'Midtown');

-- Link employees to cafes with start dates
INSERT INTO EmployeeCafeMapping (employee_id, cafe_id, start_date) VALUES
('UI1234567', (SELECT id FROM Cafes WHERE name = 'Cafe Latte'), '2023-01-01'),
('UI1234568', (SELECT id FROM Cafes WHERE name = 'Cafe Mocha'), '2023-02-15'),
('UI1234569', (SELECT id FROM Cafes WHERE name = 'Cafe Americano'), '2023-03-01');
