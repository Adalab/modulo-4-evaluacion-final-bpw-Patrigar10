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
  name VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  publisher VARCHAR(50) NOT NULL,
  stock INT NOT NULL
);
```



## Endpoints disponibles
1. Listar todos los libros
**GET /api/books**

Respuesta:

```
{
    "info": {
        "count": 7
    },
    "result": [
        {
            "idBooks": 1,
            "name": "Estupor y temblores",
            "author": "Amélie Nothomb",
            "publisher": "Anagrama",
            "stock": 1
        },
        {
            "idBooks": 2,
            "name": "Hamnet",
            "author": "Maggie O`Farrell",
            "publisher": "Libros del Asteroide",
            "stock": 3
        },
        {
            "idBooks": 3,
            "name": "Canto yo y la montaña baila",
            "author": "Irene Solà",
            "publisher": "Anagrama",
            "stock": 2
        },
        {
            "idBooks": 4,
            "name": "Lo que hay",
            "author": "Sara Torres",
            "publisher": "Reservoir Books",
            "stock": 1
        },
        {
            "idBooks": 5,
            "name": "Las niñas prodigio",
            "author": "Sabina Urraca",
            "publisher": "Fulgencio Pimentel",
            "stock": 1
        },
        {
            "idBooks": 6,
            "name": "Un lugar soleado para gente sombría",
            "author": "Mariana Enríquez",
            "publisher": "Anagrama",
            "stock": 4
        },
        {
            "idBooks": 10,
            "name": "El Palacio de la Luna",
            "author": "Paul Auster",
            "publisher": "Anagrama",
            "stock": 2
        }
    ]
}
```

2. Agregar un nuevo libro
**POST /api/book**

Body:

```
{
  "name": "Nada",
  "author": "Carmen Laforet",
  "publisher": "Austral",
  "stock": 3
}
```

Respuesta:

```
{
  "success": true,
  "id": 11
}

```

3. Editar un libro existente
**PUT /api/book/:id**

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
**DELETE /api/book/:id**

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
