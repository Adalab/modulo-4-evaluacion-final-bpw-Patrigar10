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
  try {
    const connection = await getDBConnection();

    if (!req.body) {
      res.status(404).json({
        success: false,
        message: "Provide the params",
      });
    } else {
      const { name, author, publisher, stock } = req.body;
      if (!name || !author || !publisher || stock === null) {
        res.status(404).json({
          success: false,
          message: "Bad params! Provide 'name', 'author', 'publisher', 'stock'",
        });
      } else {
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
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal error. Contact with support",
    });
  }
});

// LEER/LISTAR TODAS LAS ENTRADAS EXISTENTES
server.get("/api/books", async (req, res) => {
  try {
    const connection = await getDBConnection();
    const sqlQuery = "SELECT * FROM books";
    const [booksResult] = await connection.query(sqlQuery);
    console.log(booksResult);
    connection.end();
    res.status(200).json({
      info: {
        count: booksResult.length,
      },
      result: booksResult,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal error. Contact with support",
    });
  }
});

//ACTUALIZAR UNA ENTRADA EXISTENTE
server.put("/api/book/:id", async (req, res) => {
  try {
    const connection = await getDBConnection();

    const { id } = req.params;

    const { name, author, publisher, stock } = req.body;

    if (!name || !author || !publisher || stock === null) {
      res.status(404).json({
        success: false,
        message: "Bad params! Provide 'name', 'author', 'publisher', 'stock'",
      });
    } else {
      const sqlQuery =
        "UPDATE books SET name = ?, author = ?, publisher = ?, stock = ? WHERE idBooks= ?";
      const [result] = await connection.query(sqlQuery, [
        name,
        author,
        publisher,
        stock,
        id,
      ]);
      connection.end();
      res.status(200).json({
        success: true,
        id: result.insertId,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal error. Contact with support",
    });
  }
});

//BORRAR UNA ENTRADA
server.delete("/api/book/:id", async (req, res) => {
  try {
    const connection = await getDBConnection();
    const { id } = req.params;
    const sqlQuery = "DELETE FROM books WHERE idBooks = ?";
    const [result] = await connection.query(sqlQuery, [id]);

    connection.end();
    res.json({
      success: true,
      message: "Removed resource",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal error. Contact with support",
    });
  }
});
