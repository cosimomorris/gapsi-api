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

function eliminarProveedor({ nombre, razonSocial, direccion }) {
  const proveedores = leerProveedores();

  console.log("Datos recibidos para eliminar:", {
    nombre,
    razonSocial,
    direccion,
  });
  console.log("Proveedores antes de eliminar:", proveedores);

  const indice = proveedores.findIndex(
    (proveedor) =>
      proveedor.nombre === nombre &&
      proveedor.razonSocial === razonSocial &&
      proveedor.direccion === direccion
  );

  if (indice !== -1) {
    proveedores.splice(indice, 1);
    guardarProveedores(proveedores);
    console.log("Proveedor eliminado:", nombre);
    return true;
  } else {
    console.warn(
      "Proveedor no encontrado o no se pudo eliminar:",
      nombre,
      razonSocial,
      direccion
    );
    return false;
  }
}

export { leerProveedores, guardarProveedores, eliminarProveedor };
