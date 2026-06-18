# ToDoListV2

Aplicación web para gestión de tareas y archivos.
 
Estudiantes: 
- Fuentes Cejas Jhonatan Albert
- Loredo Salazar Leticia Brenda
## Tecnologías usadas

* Frontend: React + Vite
* Backend: Node.js + Express
* Base de datos: MongoDB Atlas


## Requisitos previos

Antes de ejecutar el proyecto se debe tener instalado:

### Node.js y npm

Descargar e instalar desde:

https://nodejs.org/

Verificar instalación:

```bash id="8e4s1v"
node -v
npm -v
```

### MongoDB Database Tools

Necesario para restaurar la base de datos (`mongorestore`).

Descargar desde:

https://www.mongodb.com/try/download/database-tools

Verificar instalación:

```bash id="m5y6bc"
mongorestore --version
```

### mkcert

Necesario para generar certificados HTTPS locales.

Descargar desde:

https://github.com/FiloSottile/mkcert/releases

Después de instalar:

```bash id="z6j4yf"
mkcert -install
```

Verificar instalación:

```bash id="j4k6nx"
mkcert --version
```

## Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd ToDoListV2

### 2. Instalar dependencias del backend

```bash
cd Backend
npm install
```

### 3. Instalar dependencias del frontend

```bash
cd ../Frontend
npm install
```

## Variables de entorno

### Backend

Crear un archivo `.env` dentro de la carpeta `Backend` con:

```env
PORT=3000
MONGO_URI=tu_uri_mongodb
JWT_SECRET=tu_clave_jwt
```

### Frontend

Crear un archivo `.env` dentro de la carpeta `Frontend` con:

```env
VITE_API_URL=https://localhost:3000
```


## Restaurar Base de Datos

Dentro de la raíz del proyecto ejecutar:

```bash
mongorestore ./database/dump
```

Esto cargará la base de datos con datos de prueba.

---

## Configuración HTTPS

### Instalar certificados locales

Ejecutar:

```bash
mkcert -install
```

---

### Generar certificados

Entrar a la carpeta `Backend` y ejecutar:

```bash
mkcert localhost 127.0.0.1 ::1
```

Se generarán dos archivos:

* localhost+2.pem
* localhost+2-key.pem

Renombrarlos:

* localhost+2.pem → cert.pem
* localhost+2-key.pem → key.pem

Y dejarlos dentro de la carpeta `Backend`.

## Ejecución del proyecto

### Ejecutar backend

```bash
cd Backend
npm run dev
```

Servidor disponible en:

https://localhost:3000

---

### Ejecutar frontend

```bash
cd Frontend
npm run dev
```

Aplicación disponible en:

https://localhost:5173

---

## Orden correcto de ejecución

1. Clonar repositorio
2. Instalar dependencias backend
3. Instalar dependencias frontend
4. Configurar variables de entorno
5. Restaurar base de datos
6. Instalar mkcert
7. Generar certificados HTTPS
8. Ejecutar backend
9. Ejecutar frontend
