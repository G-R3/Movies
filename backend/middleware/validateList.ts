import { Request, Response, NextFunction } from "express";

const validateList = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, description } = req.body;

    if (!title.trim()) {
        return res
            .status(400)
            .send({ success: false, message: "Title is required" });
    }
    if (!!description.trim() && description.length > 200) {
        return res.status(400).send({
            success: false,
            message: "Description most be equal to or less than 200 characters",
        });
    }

    next();
};

export default validateList;
