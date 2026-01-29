import express from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";


/* route imports */
import dashboardRoutes from "./routes/dashboardRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import expenseRoutes from "./routes/expenseRoutes.js"


/* configurations */
dotenv.config()
const app = express()
app.use(cors()) // cors 
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


/* routes */
app.use("/dashboard", dashboardRoutes)
app.use("/products", productRoutes)
app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);

/* server */
const port = Number(process.env.PORT) || 3005;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`)
})

