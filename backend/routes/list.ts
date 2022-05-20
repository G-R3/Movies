import express from "express";
import {
    createList,
    getUserLists,
    addMovieToList,
    deleteList,
} from "../controller/list";
import isAuthorized from "../middleware/auth";

const router = express.Router();

router.get("/lists", isAuthorized, getUserLists);
router.post("/create", isAuthorized, createList);
router.post("/add", isAuthorized, addMovieToList);
router.delete("/delete/:listId", isAuthorized, deleteList);
export default router;
