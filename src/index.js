const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const server = express();

server.use(cors());
server.use(express.json());

require("dotenv").config();

const port = 5001;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "bookstore",
  });
  connection.connect();
  return connection;
}

//INSERTAR UNA ENTRADA
server.post("/api/book", async (req, res) => {
  const connection = await getDBConnection();
  const { name, author, publisher, stock } = req.body;

  const sqlQuery =
    "INSERT INTO books (name, author, publisher, stock) VALUES (?, ?, ?, ?)";
  const [result] = await connection.query(sqlQuery, [
    name,
    author,
    publisher,
    stock,
  ]);

  connection.end();
  res.status(201).json({
    success: true,
    id: result.insertId,
  });
});

// LEER/LISTAR TODAS LAS ENTRADAS EXISTENTES
server.get("/api/books", async (req, res) => {
  const connection = await getDBConnection();
  const sqlQuery = "SELECT * FROM books";
  const [booksResult] = await connection.query(sqlQuery);
  console.log(booksResult);
  connection.end();
  res.json({});
});

//ACTUALIZAR UNA ENTRADA EXISTENTE
server.put("/api/book/:id", async (req, res) => {
  const connection = await getDBConnection();
  const { id } = req.params;

  const { name, author, publisher, stock } = req.body;
  const sqlQuery =
    "UPDATE books SET name = ?, author = ?, publisher = ?, stock = ? WHERE idBooks= ?";
  const [result] = await connection.query(sqlQuery, [
    name,
    author,
    publisher,
    stock,
    id,
  ]);
  console.log(result);
  connection.end();
  res.status(200).json({
    success: true,
    id: result.insertId,
  });
});
