import express from "express";
import { getMovie } from "../controller/movie";

const router = express.Router();

router.get("/movie/:movieId", getMovie);

export default router;
