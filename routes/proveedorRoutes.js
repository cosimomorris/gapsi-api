import Router from "@koa/router";
import {
  obtenerProveedores,
  agregarProveedor,
  eliminarProveedor,
} from "./controllers/proveedorController.js";

// Crear una instancia de Router
const proveedorRouter = new Router();

// Ruta para obtener todos los proveedores
proveedorRouter.get("/proveedores", async (ctx) => {
  try {
    // Llamar a la función del controlador para obtener todos los proveedores
    const proveedores = obtenerProveedores();
    ctx.body = proveedores;
  } catch (error) {
    ctx.status = 500; // En caso de error, establecer el código de estado 500 (Error interno del servidor)
    ctx.body = { error: "Ha ocurrido un error al obtener los proveedores." };
  }
});

// Ruta para agregar un nuevo proveedor
proveedorRouter.post("/proveedores", async (ctx) => {
  try {
    // Obtener los datos del proveedor del cuerpo de la solicitud
    const nuevoProveedor = ctx.request.body;

    // Llamar a la función del controlador para agregar el proveedor
    agregarProveedor(nuevoProveedor);

    ctx.status = 201; // Código 201 para indicar que se creó el recurso
    ctx.body = { mensaje: "Proveedor agregado con éxito." };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Ha ocurrido un error al agregar el proveedor." };
  }
});

// Ruta para eliminar un proveedor por su ID
proveedorRouter.delete("/proveedores/:id", async (ctx) => {
  try {
    // Obtener el ID del proveedor de los parámetros de la ruta
    const proveedorId = ctx.params.id;

    // Llamar a la función del controlador para eliminar el proveedor
    eliminarProveedor(proveedorId);

    ctx.status = 204; // Código 204 para indicar que no hay contenido en la respuesta
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Ha ocurrido un error al eliminar el proveedor." };
  }
});

// Exportar el Router para su uso en otros archivos
export default proveedorRouter;
