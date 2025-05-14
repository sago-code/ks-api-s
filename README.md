# Kabod-Style API S
## Descripción
Kabod-Style API S es un servicio backend RESTful desarrollado con Node.js, TypeScript y PostgreSQL. Esta API proporciona funcionalidades para gestionar usuarios en la plataforma Kabod-Style.

## Requisitos previos
- Node.js v22.14.0
- PostgreSQL
- npm o yarn
## Tecnologías utilizadas
- Node.js : Entorno de ejecución para JavaScript
- Express : Framework web para Node.js
- TypeScript : Superset tipado de JavaScript
- TypeORM : ORM para TypeScript y JavaScript
- PostgreSQL : Sistema de gestión de bases de datos relacional
- bcryptjs : Librería para el hash de contraseñas
## Instalación
1. Clonar el repositorio:
```
git clone <url-del-repositorio>
cd ks-api-s
```
2. Instalar dependencias:
```
npm install
```
3. Configurar la base de datos:
   
   - Crear una base de datos PostgreSQL llamada kabod-style
   - La configuración de la conexión se encuentra en src/db/db.ts
4. Ejecutar el script SQL para crear el procedimiento almacenado:
```
psql -U postgres -d kabod-style -f src/db/
kabod-style.sql
```
## Ejecución
### Desarrollo
```
npm run dev
```
### Producción
```
npm run build
npm start
```
## Estructura del proyecto
```
ks-api-s/
├── src/
│   ├── controllers/     # Controladores de 
la aplicación
│   ├── db/              # Configuración de 
la base de datos
│   ├── entities/        # Entidades de 
TypeORM
│   ├── middleware/      # Middleware 
personalizado
│   ├── routes/          # Definición de 
rutas
│   ├── services/        # Servicios de la 
aplicación
│   ├── app.ts           # Configuración de 
Express
│   └── index.ts         # Punto de entrada 
de la aplicación
├── .gitignore           # Archivos 
ignorados por Git
├── package.json         # Dependencias y 
scripts
├── tsconfig.json        # Configuración de 
TypeScript
└── README.md            # Documentación 
del proyecto
```
## API Endpoints
### Usuarios
- POST /users : Crear un nuevo usuario
  - Body:
  ```
  {
    "firstName": "Nombre",
    "lastName": "Apellido",
    "age": 25,
    "email": "correo@ejemplo.com",
    "password": "contraseña123",
    "phone": 573001234567,
    "photo": "url_de_la_foto.jpg"
  }
  ```
  - Respuesta exitosa (201):
  ```
  {
    "message": "User created successfully"
  }
  ```
## Configuración de la base de datos
La aplicación utiliza PostgreSQL como base de datos. La configuración se encuentra en src/db/db.ts :

```
export const AppDataSource = new DataSource
({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "sago-code",
    port: 5432,
    database: "kabod-style",
    entities: [User],
    logging: true,
    synchronize: true,
})
```
## Autores
Santiago Orjuela Vera
Jua Sebastian Palomino