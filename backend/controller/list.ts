import { Request, Response } from "express";
import List from "../models/list";

const createList = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const { id } = req.user;

        if (!title) {
            return res
                .status(400)
                .send({ success: false, message: "Title is required" });
        }
        if (description && description.length > 200) {
            return res.status(400).send({
                success: false,
                message:
                    "Description most be equal to or less than 200 characters",
            });
        }

        await List.create({
            title,
            description,
            owner: id,
        });

        res.status(200).send({ success: true, message: "New list created" });
    } catch (err) {
        console.log("ERROR, likely some validation error when creating list");
        console.log(err);
    }
};

export { createList };
