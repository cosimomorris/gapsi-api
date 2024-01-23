// Patrón de Módulo: Este módulo encapsula la configuración inicial y esencial del servidor Koa,
//incluyendo la importación y aplicación de middlewares, la configuración de rutas y el inicio del
//servidor. Actúa como el punto de entrada centralizado de la aplicación, lo que facilita la gestión y escalabilidad de la configuración del servidor.

import Koa from "koa";
import bodyParser from "koa-bodyparser";
import proveedorRouter from "./routes/proveedorRoutes.js";
import cors from "@koa/cors"; // Importar cors

const app = new Koa();

// Configurar CORS
app.use(
  cors({
    origin: "http://localhost:3001", // Permitir solicitudes desde tu frontend
  })
);

app.use(bodyParser());
app.use(proveedorRouter.routes()).use(proveedorRouter.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
