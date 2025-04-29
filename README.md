# Librería Backend API
Este es un backend construido con Node.js, Express y MySQL, diseñado para gestionar los libros de una librería. Permite al personal encargado realizar operaciones básicas como listar, agregar, editar y eliminar libros del catálogo.

## Instalación
- Clona el repositorio:

`git clone https://github.com/tu_usuario/nombre-repo.git
cd nombre-repo`


- Instala las dependencias:

`npm install`

- Crea un archivo .env con tus credenciales de base de datos:
  
```
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
```
 
- Asegúrate de tener una base de datos llamada bookstore con la tabla books:

```
CREATE DATABASE bookstore;

USE bookstore;

CREATE TABLE books (
  idBooks INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  author VARCHAR(255),
  publisher VARCHAR(255),
  stock INT
);
```



## Endpoints disponibles
1. Listar todos los libros
GET /api/books

Respuesta:

```
{
  "info": { "count": 3 },
  "result": [
    {
      "idBooks": 1,
      "name": "Estupor y temblores",
      "author": "Amélie Nothomb",
      "publisher": "Anagrma",
      "stock": 1
    }
  ]
}
```

2. Agregar un nuevo libro
POST /api/book

Body:

```
{
  "name": "Nada",
  "author": "Carmen Laforet",
  "publisher": "Austral",
  "stock": 3
}

Respuesta:

```
{
  "success": true,
  "id": 11
}

```

3. Editar un libro existente
PUT /api/book/:id

Body:

```
{
  "name": "Nada",
  "author": "Carmen Laforet",
  "publisher": "Austral",
  "stock": 8
}
```
Respuesta:

```
{
  "success": true,
  "id": 0
}
```

4. Borrar un libro
DELETE /api/book/:id

Respuesta:

``` 
{
  "success": true,
  "message": "Removed resource"
}
```

## Tecnologías usadas
- Node.js

- Express.js

- MySQL2

- Dotenv

- CORS
