# 🍽️ API REST Restaurante

## 📌 Descripción 
Este proyecto consiste en una API REST desarrollada con **Node.js**, **Express**, **Prisma ORM** y **PostgreSQL**. Permite gestionar usuarios, mesas y reservaciones de un restaurante, implementando autenticación mediante **JWT** y control de acceso por roles (cliente y administrador).

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JSON Web Token (JWT)
- bcrypt
- Swagger UI

---

## 📂 Estructura del proyecto

```
API_RESTAURANTE/
│
├── controller/
├── middleware/
├── prisma/
├── routes/
├── swagger/
├── index.js
├── package.json
├── package-lock.json
├── .env.example
└── README.md
```

---

## 🔐 Autenticación y roles

La API utiliza autenticación mediante **JWT**.

### Roles disponibles

- Cliente
- Administrador

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/martitasantos/api-restaurante.git
```

### 2. Entrar al proyecto

```bash
cd api-restaurante
```

### 3. Instalar dependencias

```bash
npm install
```

---

## 📦 Variables de entorno

Crear un archivo **.env** basado en **.env.example** con la siguiente información:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/bd_restaurante"
JWT_SECRET="restaurante2026"
PORT=3000
```

---

## ▶️ Ejecutar el proyecto

```bash
node index.js
```

o si utilizas nodemon:

```bash
npm run dev
```

---

## 📖 Documentación Swagger

### Desarrollo local

http://localhost:3000/api-docs

### Producción (Railway)

https://api-restaurante-production-78c7.up.railway.app/api-docs

---

## 🌐 URL de la API

### Producción

https://api-restaurante-production-78c7.up.railway.app

### Desarrollo local

http://localhost:3000

---

## 📌 Funcionalidades

- Registro de usuarios.
- Inicio de sesión con JWT.
- Autenticación mediante token.
- Control de acceso por roles.
- Gestión de mesas.
- Registro de reservaciones.
- Documentación de la API con Swagger.

---

## 🗄️ Base de datos

La base de datos está diseñada utilizando **Prisma ORM** sobre **PostgreSQL**.

El esquema de la base de datos se encuentra en:

```
prisma/schema.prisma
```

---

## 👩‍💻 Autora

**Martha Santos**

Proyecto desarrollado como parte del curso de Desarrollo de APIs REST utilizando Node.js, Express, Prisma ORM y PostgreSQL.

---

## 📄 Licencia

Proyecto desarrollado con fines educativos.

