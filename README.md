# Links App MySql

## Comenzando 🚀
_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos
Cosas que necesitas para instalar el software

* MySql

* Node.js

* Git

### Instalacion 🔧
_Serie de pasos para ejecutar en local y en entorno de desarrollo_

* Estar en la carpeta del Archivo clonado
* Abrir consola de comandos -- Windows/Linux/Mac

#### Clonar el repositorio o descargar el ZIP
```
https://github.com/denis360/links-app-mysql.git
```

#### Instalar dependencias correspondientes
* Ir a la carpeta y ejecutar
```
npm install
```

#### Iniciar Mysql
* Si estas en linux ejecuta:
```
sudo systemctl start mysqld.service
```
* Ejecutar en la terminal de comandos
```
mysql -u root -p
```
* Ingresar la contraceña de tu usuario de mysql

### Crear las tablas de MySql
* Crear la base de datos
```
CREATE DATABASE database_links;
```
* Cambiar a la base de datos creada
```
USE database_links;
```
* Crear la tabla para los usuarios
```

CREATE TABLE users(
  id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(200) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);
```
* Crear la tabla para los enlaces
```
CREATE TABLE links(
  id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2,
  title VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE links
  ADD PRIMARY KEY (id);
```

#### Editar el archivo /src/keys.js
```
module.exports = {
  database: {
    connectionLimit: 10,
    host: process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'PONER TU CONTRASEÑA DE USUARIO MYSQL',
    database: process.env.DATABASE_NAME || 'database_links',
  }
};
```

#### Iniciar en local y en entorno de desarrollo 🛠
* En otra terminal de comandos ejecutar:
```
npm run dev
```

* Ir a tu navegador a la ruta http://localhost:3000

## Construido con:
* [Node.js](https://nodejs.org/es/)
* [MySQL](https://www.mysql.com/)
* [Express](https://expressjs.com/es/)
* [Handlebars](https://handlebarsjs.com/)
