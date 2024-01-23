// Importa las funciones necesarias para manejar los proveedores
import {
  leerProveedores,
  guardarProveedores,
  eliminarProveedor,
} from "../models/proveedor.js";

// Función para obtener los proveedores con paginación
async function getProveedores(ctx) {
  try {
    const page = parseInt(ctx.query.page) || 1; // Obtiene la página desde los parámetros de consulta, o usa 1 por defecto
    const limit = parseInt(ctx.query.limit) || 10; // Obtiene el límite desde los parámetros de consulta, o usa 10 por defecto
    const proveedores = leerProveedores();

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const proveedoresPaginados = proveedores.slice(startIndex, endIndex);

    ctx.body = proveedoresPaginados;
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    ctx.status = 500;
    ctx.body = { error: "Ha ocurrido un error al obtener los proveedores." };
  }
}

async function postProveedor(ctx) {
  try {
    const nuevoProveedor = ctx.request.body;
    const proveedoresExistentes = leerProveedores();

    // Verifica si el 'id' o 'correo' ya existe
    const duplicado = proveedoresExistentes.some(
      (proveedor) =>
        proveedor.id === nuevoProveedor.id ||
        proveedor.correo === nuevoProveedor.correo
    );

    if (duplicado) {
      // Si hay un duplicado, devuelve un mensaje de error
      ctx.status = 400; // Código de estado para solicitud incorrecta
      ctx.body = { error: "El ID o correo del proveedor ya existe." };
    } else {
      // Si no hay duplicados, agrega el nuevo proveedor
      proveedoresExistentes.push(nuevoProveedor);
      guardarProveedores(proveedoresExistentes);
      console.log("Proveedor agregado con éxito:", nuevoProveedor);
      ctx.status = 201; // Creado
      ctx.body = { mensaje: "Proveedor agregado con éxito." };
    }
  } catch (error) {
    console.error("Error al agregar proveedor:", error);
    ctx.status = 500;
    ctx.body = { error: "Ha ocurrido un error al agregar el proveedor." };
  }
}

// Función para eliminar un proveedor por su ID
async function deleteProveedor(ctx) {
  try {
    const proveedorId = parseInt(ctx.params.id, 10); // Convierte el ID de string a número
    const eliminado = eliminarProveedor(proveedorId);
    if (eliminado) {
      console.log("Proveedor eliminado con éxito, ID:", proveedorId); // Console log añadido
      ctx.status = 200; // Cambiado de 204 a 200
      ctx.body = {
        mensaje: `Proveedor con ID ${proveedorId} eliminado con éxito.`,
      }; // Mensaje de confirmación
    } else {
      console.warn(
        "Proveedor no encontrado o no se pudo eliminar, ID:",
        proveedorId
      ); // Console log añadido
      ctx.status = 404;
      ctx.body = { error: "Proveedor no encontrado o no se pudo eliminar." };
    }
  } catch (error) {
    console.error("Error al eliminar proveedor:", error); // Console log añadido
    ctx.status = 500;
    ctx.body = { error: "Ha ocurrido un error al eliminar el proveedor." };
  }
}

// Exporta las funciones para su uso en las rutas
export { getProveedores, postProveedor, deleteProveedor };
