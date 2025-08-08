# CRUD_USERS
Proyecto backend desarrollado con **Node.js** y **Express** que implementa autenticación, validación y gestión de usuarios con una base de datos **SQL Server**. El sistema incluye funcionalidades de login, encriptación de contraseñas y manejo de sesiones utilizando **JWT (JSON Web Tokens)**.

## 🚀 Tecnologías utilizadas

- Node.js
- Express 5
- SQL Server (mssql)
- JWT (jsonwebtoken)
- Bcrypt (para encriptación)
- Dotenv
- Cookie-parser

## 📁 Estructura del proyecto
```
📂 CRUD_USERS/
├── 📂 src/
│    ├── 📂 config
│    │   └── 📄 connectionSQLServer.js
│    ├── 📂 controllers/
│    │   ├── 📄 login.js
│    │   └── 📄 user.js
│    ├── 📂 middlewares/
│    │   └── 📄 validators.js
│    ├── 📂 models/
│    │   ├── 📄 login.js
│    │   └── 📄 user.js
│    ├── 📂 routers/
│    │   ├── 📄 login.js
│    │   └── 📄 user.js
│    ├── 📂 Utils/
│    |   ├── 📄 const.js
│    |   ├── 📄 security.js
│    |   └── 📄 validator.js
|    ├── 📄 config.js
|    └── 📄 index.js
├── 📄 .env
├── 📄 package.json
├── 📄 .gitignore
└── 📄 README.md
```

## 🔧 Instalación y ejecución

1. Clona el repositorio:

> git clone https://github.com/TheLuizZ/CRUD_USERS.git

> cd CRUD_USERS

> npm install

Crea un archivo .env en la raíz del proyecto con tus variables de entorno. Ejemplo:
```
PORT=3000
## Environment Variables for Database SQL Server Connection
DB_SERVER="localhost"
DB_DATABASE="CRUD_Users"
DB_USER="sa"
DB_PASSWORD="Pass123%@"
```
> node --run dev-watch

## 📌 Endpoints principales
| Método | Ruta            | Descripción               | Json |
| ------ | --------------- | ------------------------- | ------------------------- |
| GET   | /      | Obtener toda la lista de usuarios          | {} |
| GET    | /GetUsersById      | Obtener usuario por id | {"id": 1} |
| POST   | /CreateUser      | Crear un nuevo usuario    | {"name": "Luis Martinez", "password": "Hola1234&", "email": "LuisMartinez@gmail.com", "rol_id": 1} |
| PATCH    | /UpdateUser | Actualizar un usuario     | {"id": 1, "name": "Jose Martinez", "password": "Hola12345&", "email": "JoseMartinez@gmail.com", "rol_id": 2} |
| DELETE | /DeleteUser | Eliminar un usuario       | {"id": 1} |
| POST | /Login | Login del usuario       | {"email": "JoseMartinez@gmail.com", "password": "Hola12345&"} |
| POST | /LogOut | LogOut del ususario       | {} |

## 🛡️ Seguridad
Las contraseñas se almacenan de forma segura utilizando bcrypt.

Autenticación basada en JWT para proteger rutas sensibles.

Validaciones a través de middlewares personalizados.

## 👨‍💻 Desarrollador
Luiz Martinez - Github: [@TheLuizz](https://github.com/TheLuizz) |
Linkedin: [@JoseLuisMartinez](https://www.linkedin.com/in/jose-luis-martinez-ochoa-08b0a9276/)
