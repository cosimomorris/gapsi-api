// Importando módulos con sintaxis ES
import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import {
  obtenerProveedores,
  agregarProveedor,
} from "./controllers/proveedorController.js";

// Creando una nueva instancia de Koa y Router
const app = new Koa();
const router = new Router();

// Usar bodyParser para parsear los cuerpos de las peticiones
app.use(bodyParser());

// Definiendo rutas
router.get("/proveedores", obtenerProveedores);
router.post("/proveedores", agregarProveedor);
// Aquí puedes añadir más rutas para actualización y eliminación

// Aplicando las rutas al middleware de Koa
app.use(router.routes()).use(router.allowedMethods());

// Definiendo el puerto y poniendo el servidor a escuchar
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Exportaciones si son necesarias (en este caso, probablemente no lo sean)
export { app };
