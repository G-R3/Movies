import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IUserRequest extends Request {
    user: any;
}

const isAuthorized = (req: IUserRequest, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res
                .status(401)
                .send({ success: false, message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, `${process.env.JWT_KEY}`);
        console.log(decoded);

        req.user = decoded;
        next();
    } catch (err) {
        console.error("Unauthorized");
        return res
            .status(401)
            .send({ success: false, message: "Unauthorized" });
    }
};

export default isAuthorized;
