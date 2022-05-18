import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import dbConnection from "./config/db";
import authRoutes from "./routes/auth";
import listRoutes from "./routes/list";
const app = express();

dotenv.config();
dbConnection();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);
app.use("/api", listRoutes);

app.listen(5000, () => {
    console.log("listening on PORT 5000");
});
