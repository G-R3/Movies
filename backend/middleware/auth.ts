import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res
                .status(401)
                .send({ success: false, message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, `${process.env.JWT_KEY}`);

        req.user = decoded;
        next();
    } catch (err) {
        return res
            .status(401)
            .send({ success: false, message: "Unauthorized" });
    }
};

export default isAuthorized;
