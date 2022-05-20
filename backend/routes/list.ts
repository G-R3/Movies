import express from "express";
import {
    createList,
    getUserLists,
    addMovieToList,
    deleteList,
} from "../controller/list";
import isAuthorized from "../middleware/auth";
import isListOwner from "../middleware/isListOwner";

const router = express.Router();

router.get("/lists", isAuthorized, getUserLists);
router.post("/create", isAuthorized, createList);
router.post("/add/:listId", isAuthorized, isListOwner, addMovieToList);
router.delete("/delete/:listId", isAuthorized, isListOwner, deleteList);
export default router;
