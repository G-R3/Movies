import express from "express";
import { createList, getUserLists, addMovieToList } from "../controller/list";
import isAuthorized from "../middleware/auth";

const router = express.Router();

router.get("/lists", isAuthorized, getUserLists);
router.post("/create", isAuthorized, createList);
router.post("/add", isAuthorized, addMovieToList);
export default router;
