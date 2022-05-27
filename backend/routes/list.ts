import express from "express";
import {
    createList,
    getUserLists,
    addMovieToList,
    editList,
    deleteList,
    getList,
    deleteMovieFromList,
} from "../controller/list";
import isAuthorized from "../middleware/auth";
import isListOwner from "../middleware/isListOwner";
import validateList from "../middleware/validateList";

const router = express.Router();

router.get("/lists", isAuthorized, getUserLists);
router.get("/list/:listId", isAuthorized, getList);
router.post("/create", isAuthorized, validateList, createList);
router.post("/add/:listId", isAuthorized, isListOwner, addMovieToList);
router.put("/edit/:listId", validateList, editList);
router.delete("/delete/:listId", isAuthorized, isListOwner, deleteList);
router.delete(
    "/delete/:listId/movie/:movieId",
    isAuthorized,
    isListOwner,
    deleteMovieFromList
);
export default router;
