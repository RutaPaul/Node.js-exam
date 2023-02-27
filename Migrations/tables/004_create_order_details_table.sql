CREATE TABLE IF NOT EXISTS Order_Details(
	OrderID INT(6) NOT NULL,
	ProductID INT(6) NOT NULL,
	UnitPrice DOUBLE NOT NULL,
	Quantity INT(6) NOT NULL,
	Discount INT(6),
	CONSTRAINT fk_order_detail_productID FOREIGN KEY (ProductID) REFERENCES Products (ProductID),
	CONSTRAINT fk_order_detail_orderID FOREIGN KEY (OrderID) REFERENCES Orders (OrderID)
);