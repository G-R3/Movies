import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import dbConnection from "./config/db";
import User from "./models/user";

const app = express();

dotenv.config();
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/register", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: 400, error: "Empty fields" });
    }

    const existingUser = await User.findOne({
        email,
    });

    if (existingUser) {
        return res
            .status(400)
            .json({ status: 400, error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hashedPassword });

    return res
        .status(200)
        .json({ status: 200, user: user.email, message: "Welcome aboard!" });
});

app.post("/api/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Empty fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res
            .status(400)
            .json({ status: 400, error: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return res
            .status(400)
            .json({ status: 400, error: "Invalid email or password" });
    }

    return res
        .status(200)
        .json({ status: 200, user: user.email, message: "Welcome back" });
});

app.listen(5000, () => {
    console.log("listening on PORT 5000");
});
