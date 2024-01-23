Gapsi API Backend

Gapsi API es un backend de ecommerce diseñado para gestionar proveedores. Utiliza un enfoque basado en archivos JSON para almacenar datos y proporciona una API RESTful para interactuar con estos datos.

Características Principales
CRUD de proveedores: Crear, leer, actualizar y eliminar proveedores.
Paginación en la consulta de proveedores.
Consulta de la versión actual del backend y el número del próximo proveedor.
Tecnologías Utilizadas
Koa.js como framework de servidor.
Manejo de rutas con @koa/router.
Lectura y escritura de archivos JSON para almacenamiento de datos.
Instalación

Para ejecutar este proyecto localmente, sigue los siguientes pasos:

Clonar el repositorio:
git clone https://github.com/cosimomorris/gapsi-api.git
cd gapsi-api
Instalar las dependencias:
npm install

Para iniciar el servidor, ejecuta:
(instala nodemon antes de ejecutar 'npm install -g nodemon' si not cuentes con ella en tu maquina local)
npm start

El servidor se iniciará en http://localhost:3000. Las rutas disponibles son:

GET /proveedores: Obtiene una lista de proveedores con paginación.
POST /proveedores: Añade un nuevo proveedor.
DELETE /proveedores/:id: Elimina un proveedor por su ID.
GET /info: Obtiene la versión actual del backend y el número del próximo proveedor.
Configuración
No se requieren archivos .env ni configuraciones adicionales para ejecutar el proyecto en su estado actual.

Puedes encontrar un collection de postamn para probar los API en ./gapsi-api-postman_collection.js

Cosimo V
