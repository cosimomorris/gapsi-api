import fs from "fs";
import path from "path";

const currentDir = path.dirname(new URL(import.meta.url).pathname);
const dataPath = path.join(currentDir, "../bd.json");

function leerProveedores() {
  const jsonData = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(jsonData).proveedores;
}

function guardarProveedores(proveedores) {
  const data = JSON.stringify({ proveedores }, null, 4);
  fs.writeFileSync(dataPath, data, "utf-8");
}

function eliminarProveedor(id) {
  const proveedores = leerProveedores();
  const indice = proveedores.findIndex((proveedor) => proveedor.id === id);

  if (indice !== -1) {
    proveedores.splice(indice, 1); // Elimina el proveedor del array
    guardarProveedores(proveedores); // Guarda los cambios en el archivo
    return true; // Éxito al eliminar el proveedor
  } else {
    return false; // El proveedor no se encontró o no se pudo eliminar
  }
}

export { leerProveedores, guardarProveedores, eliminarProveedor };
