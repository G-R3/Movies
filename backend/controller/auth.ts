import { Request, Response } from "express";
import { Types } from "mongoose";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (id: Types.ObjectId) => {
    return jwt.sign({ id }, `${process.env.JWT_KEY}`, { expiresIn: "30d" });
};

const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ status: 400, error: "Empty fields" });
    }

    const existingUser = await User.findOne({
        email,
    });

    if (existingUser) {
        return res
            .status(400)
            .send({ status: 400, error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hashedPassword });

    console.log(typeof user._id);

    return res
        .status(200)
        .cookie("token", generateToken(user._id), { httpOnly: true })
        .send({
            status: 200,
            user: user.email,
            message: "Welcome aboard!",
        });
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: "Empty fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res
            .status(400)
            .send({ status: 400, error: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return res
            .status(400)
            .send({ status: 400, error: "Invalid email or password" });
    }

    return res
        .status(200)
        .cookie("token", generateToken(user._id), { httpOnly: true })
        .send({
            status: 200,
            user: user.email,
            message: "Welcome back",
        });
};

const logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    return res.status(200).send({ message: "Comback soon" });
};

export { register, login, logout };
