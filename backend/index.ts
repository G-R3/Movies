import express, { Request, Response } from "express";

const app = express();

app.get("/api/", (req: Request, res: Response) => {
    return res.send({ message: "Hello from server" });
});

app.listen(3001, () => {
    console.log("listening on PORT 3000");
});
