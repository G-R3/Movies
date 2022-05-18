import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// https://stackoverflow.com/questions/58200432/argument-of-type-req-request-res-iresponse-next-nextfunction-void-is
declare module "express-serve-static-core" {
    interface Request {
        user: any;
    }
}

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
