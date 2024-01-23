import Koa from "koa";
import bodyParser from "koa-bodyparser";
import proveedorRouter from "./routes/proveedorRoutes.js";

const app = new Koa();

app.use(bodyParser());

app.use(proveedorRouter.routes()).use(proveedorRouter.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
