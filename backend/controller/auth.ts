import { Request, Response } from "express";
import { Types } from "mongoose";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (id: Types.ObjectId) => {
    return jwt.sign({ id }, `${process.env.JWT_KEY}`, { expiresIn: "5d" });
};

const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .send({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({
        email,
    });

    if (existingUser) {
        return res.status(400).send({
            success: false,
            message: "Email is not available",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hashedPassword });

    return res
        .status(200)
        .cookie("token", generateToken(user._id), { httpOnly: true })
        .send({
            success: true,
            message: "Welcome aboard!",
        });
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .send({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res
            .status(400)
            .send({ success: false, message: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return res
            .status(400)
            .send({ success: false, message: "Invalid email or password" });
    }

    return res
        .status(200)
        .cookie("token", generateToken(user._id), { httpOnly: true })
        .send({
            success: true,
            message: "Welcome back",
        });
};

const logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    return res.status(200).send({ message: "Comback soon" });
};

const isLoggedIn = (req: Request, res: Response) => {
    try {
        const { token } = req.cookies;

        if (!token) return res.send(false);

        jwt.verify(token, `${process.env.JWT_KEY}`);

        res.send(true);
    } catch (err) {
        res.send(false);
    }
};

export { register, login, logout, isLoggedIn };
