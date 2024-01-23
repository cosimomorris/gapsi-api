import Router from "@koa/router";
import {
  getProveedores,
  postProveedor,
  deleteProveedor,
  getVersionAndNextCandidate,
} from "../controllers/proveedorController.js";

const proveedorRouter = new Router();
//CRUD routes
proveedorRouter.get("/proveedores", getProveedores);
proveedorRouter.post("/proveedores", postProveedor);
proveedorRouter.delete("/proveedores", deleteProveedor);

// ruta para obtener la versión del paquete y el número del siguiente candidato
proveedorRouter.get("/info", getVersionAndNextCandidate);

export default proveedorRouter;
