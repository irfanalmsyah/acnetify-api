import morgan from "morgan"
import express from "express"
import cors from "cors"
import httpContext from "express-http-context"
import baseRoutes from "./routes"
import { addModelToApp } from "@services/image.service"

const app = express()


app.use(morgan("short"))

app.use(express.json())

app.use(httpContext.middleware)

;(async () => {
    await addModelToApp(app)
})()

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
)

app.use(baseRoutes)

export default app