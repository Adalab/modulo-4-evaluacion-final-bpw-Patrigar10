CREATE DATABASE bookStore;

USE bookStore;

CREATE TABLE clients (
idClients INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(50) NOT NULL
);


CREATE TABLE books(
idBooks INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
author VARCHAR(100) NOT NULL,
publisher VARCHAR(50) NOT NULL,
stock INT NOT NULL
);

CREATE TABLE purchases(
idPurchase INT AUTO_INCREMENT PRIMARY KEY,
fk_clients INT,
fk_books INT,
FOREIGN KEY (fk_clients) REFERENCES clients(idClients),
FOREIGN KEY (fk_books) REFERENCES books(idBooks)
);

INSERT INTO clients(name, email, password)
VALUES 
('Rocío Martínez', 'ro@gmail.com', '1234'),
('Susana Garrido', 'susan@gmail.com', '1234'),
('Julia Domínguez', 'julia@gmail.com', '1234');


INSERT INTO books (name, author, publisher, stock)
VALUES
('Estupor y temblores', 'Amélie Nothomb', 'Anagrama', 1),
('Hamnet', 'Maggie O`Farrell', 'Libros del Asteroide', 3), 
('Canto yo y la montaña baila', 'Irene Solà', 'Anagrama', 2), 
('Lo que hay', 'Sara Torres', 'Reservoir Books', 1);

INSERT INTO purchases (fk_clients, fk_books)
VALUES
(1, 3),
(2, 3), 
(3, 1);


