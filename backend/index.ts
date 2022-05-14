import express, { Request, Response } from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/register", (req: Request, res: Response) => {
    console.log(req.body);
    return res.send({ message: "Hello from server" });
});

app.listen(5000, () => {
    console.log("listening on PORT 5000");
});
