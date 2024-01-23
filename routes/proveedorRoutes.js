import Router from "@koa/router";
import {
  getProveedores,
  postProveedor,
  deleteProveedor,
} from "../controllers/proveedorController.js";

const proveedorRouter = new Router();

proveedorRouter.get("/proveedores", getProveedores);
proveedorRouter.post("/proveedores", postProveedor);
proveedorRouter.delete("/proveedores/:id", deleteProveedor);

export default proveedorRouter;
