// Importa las funciones necesarias para manejar los proveedores
import {
  obtenerProveedores,
  agregarProveedor,
  eliminarProveedor,
} from "./proveedorService.js";

// Función para obtener todos los proveedores
async function getProveedores(ctx) {
  try {
    const proveedores = obtenerProveedores();
    ctx.body = proveedores;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Ha ocurrido un error al obtener los proveedores." };
  }
}

// Función para agregar un nuevo proveedor
async function postProveedor(ctx) {
  try {
    const nuevoProveedor = ctx.request.body;
    agregarProveedor(nuevoProveedor);
    ctx.status = 201;
    ctx.body = { mensaje: "Proveedor agregado con éxito." };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Ha ocurrido un error al agregar el proveedor." };
  }
}

// Función para eliminar un proveedor por su ID
async function deleteProveedor(ctx) {
  try {
    const proveedorId = ctx.params.id;
    eliminarProveedor(proveedorId);
    ctx.status = 204;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Ha ocurrido un error al eliminar el proveedor." };
  }
}

// Exporta las funciones para su uso en las rutas
export { getProveedores, postProveedor, deleteProveedor };
