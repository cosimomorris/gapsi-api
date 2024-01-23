// Importa las funciones necesarias para manejar los proveedores
import {
  leerProveedores,
  guardarProveedores,
  eliminarProveedor,
} from "../models/proveedor.js";

import fs from "fs/promises";
import path from "path";

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

// Función actualizada para eliminar un proveedor
async function deleteProveedor(ctx) {
  try {
    const { nombre, razonSocial, direccion } = ctx.request.body; // Utiliza los nuevos campos
    const eliminado = eliminarProveedor({ nombre, razonSocial, direccion });
    if (eliminado) {
      console.log(
        "Proveedor eliminado con éxito:",
        nombre,
        razonSocial,
        direccion
      );
      ctx.status = 200;
      ctx.body = { mensaje: "Proveedor eliminado con éxito." };
    } else {
      console.warn(
        "Proveedor no encontrado o no se pudo eliminar:",
        nombre,
        razonSocial,
        direccion
      );
      ctx.status = 404;
      ctx.body = { error: "Proveedor no encontrado o no se pudo eliminar." };
    }
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);
    ctx.status = 500;
    ctx.body = { error: "Ha ocurrido un error al eliminar el proveedor." };
  }
}

//Funcion para version number y candidate number
async function getVersionAndNextCandidate(ctx) {
  try {
    // Lee el archivo package.json
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJson = await fs.readFile(packageJsonPath, "utf8");
    const pkg = JSON.parse(packageJson);

    const proveedores = leerProveedores();
    const nextCandidateNumber = proveedores.length + 1;
    const version = pkg.version;

    ctx.body = { version, nextCandidateNumber };
  } catch (error) {
    console.error("Error al obtener la información:", error);
    ctx.status = 500;
    ctx.body = { error: "Ha ocurrido un error al obtener la información." };
  }
}

// Exporta las funciones para su uso en las rutas
export {
  getProveedores,
  postProveedor,
  deleteProveedor,
  getVersionAndNextCandidate,
};
