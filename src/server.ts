import morgan from "morgan"
import express from "express"
import cors from "cors"
import httpContext from "express-http-context"
import baseRoutes from "./routes"
import { loadModel } from "@services/loadmodel.service"

const app = express();


app.use(morgan("short"));

app.use(express.json());

app.use(httpContext.middleware);

(async () => {
    console.log("--async passed--")
    const model = await loadModel()
    console.log("--loadModel passed--")
    app.set("model", model)
    console.log("Model loaded successfully")
})();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(baseRoutes);

export default app