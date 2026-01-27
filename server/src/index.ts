import express from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";


/* route imports */
import dashboardRoutes from "./routes/dashboardRoutes.js"

/* configurations */
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


/* routes */
app.use("/dashboard", dashboardRoutes)

/* server */
const port = process.env.PORT || 3005;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

