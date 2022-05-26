import { Request, Response, NextFunction } from "express";
import List from "../models/List";

const isListOwner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { listId } = req.params;

        const list = await List.findById(listId);

        if (!list) {
            return res.status(404).send({
                success: false,
                message: "List does not exist",
            });
        }

        if (!list?.owner?.equals(req?.user?.id)) {
            return res.status(401).send({
                success: false,
                message: "You do not have permission to delete list",
            });
        }

        next();
    } catch (err) {
        return res
            .status(401)
            .send({ success: false, message: "Failed to delete list" });
    }
};

export default isListOwner;
