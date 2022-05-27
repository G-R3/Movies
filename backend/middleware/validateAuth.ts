import { Request, Response, NextFunction } from "express";

const validateAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) {
        return res.status(400).send({
            success: false,
            message: "Email and password are required",
        });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        return res
            .status(400)
            .send({ success: false, message: "Invalid email" });
    } else if (password.length < 6) {
        return res.status(400).send({
            success: false,
            message: "Password must be at least 6 characters long",
        });
    }

    next();
};

export default validateAuth;
