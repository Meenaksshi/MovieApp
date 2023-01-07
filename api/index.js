import express from 'express'
import authRoutes from "./routes/auth.js"
import movieRoutes from "./routes/movies.js"
import cookieParser from 'cookie-parser'
import cors from "cors";

const app = express()
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/movies", movieRoutes)

app.listen(8080, () => {
    console.log("Connected")
})
