## HTTPS Setup

Instalar mkcert.

Generar certificados:

```bash
mkcert localhost 127.0.0.1 ::1
```

Renombrar:

* localhost+2.pem → cert.pem
* localhost+2-key.pem → key.pem

Ejecutar backend:

```bash
npm run dev
```

Backend disponible en:

https://localhost:3000

Frontend disponible en:

https://localhost:5173


## Variables de entorno

Crear un archivo `.env` dentro de la carpeta backend con:

```env id="3v24gx"
MONGO_URI=tu_uri_mongodb
JWT_SECRET=tu_clave_jwt
```
## Restaurar Base de Datos

Ejecutar:

```bash
mongorestore ./database/dump
```
