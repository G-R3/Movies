import express from "express";
import {
    createList,
    getUserLists,
    addMovieToList,
    deleteList,
    getList,
    deleteMovieFromList,
} from "../controller/list";
import isAuthorized from "../middleware/auth";
import isListOwner from "../middleware/isListOwner";

const router = express.Router();

router.get("/lists", isAuthorized, getUserLists);
router.get("/list/:listId/movies", isAuthorized, getList);
router.post("/create", isAuthorized, createList);
router.post("/add/:listId", isAuthorized, isListOwner, addMovieToList);
router.delete("/delete/:listId", isAuthorized, isListOwner, deleteList);
router.delete(
    "/delete/:listId/movie/:movieId",
    isAuthorized,
    isListOwner,
    deleteMovieFromList
);
export default router;
