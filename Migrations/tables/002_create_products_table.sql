CREATE TABLE IF NOT EXISTS Products(
	ProductID INT(6) AUTO_INCREMENT PRIMARY KEY,
	ProductName VARCHAR(255) NOT NULL,
	SupplierID INT(6),
	CategoryID INT(6),
	QuantityPerUnit INT(6),
	UnitPrice DOUBLE
);