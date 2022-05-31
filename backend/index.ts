import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import dbConnection from "./config/db";
import authRoutes from "./routes/auth";
import listRoutes from "./routes/list";
import movieRoute from "./routes/movie";

const app = express();

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}
dbConnection();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/api", listRoutes);
app.use("/api", movieRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("listening on PORT 5000");
});
