import fs from "fs";
import path from "path";

const dataPath = path.join(__dirname, "../bd.json"); // Ajusta la ruta según la ubicación de tu archivo bd.json

function leerProveedores() {
  const jsonData = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(jsonData).proveedores;
}

function guardarProveedores(proveedores) {
  const data = JSON.stringify({ proveedores }, null, 4);
  fs.writeFileSync(dataPath, data, "utf-8");
}

export { leerProveedores, guardarProveedores };
