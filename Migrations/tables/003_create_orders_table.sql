CREATE TABLE IF NOT EXISTS Orders(
	OrderID INT(6) AUTO_INCREMENT PRIMARY KEY,
	CustomerID INT(6),
	EmployeeID INT(6),
	OrderDate TIMESTAMP NOT NULL,
	CONSTRAINT fk_order_employeeID FOREIGN KEY (EmployeeID) REFERENCES Employees (EmployeeID)
);