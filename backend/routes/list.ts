import express from "express";
import { createList, getUserLists } from "../controller/list";
import isAuthorized from "../middleware/auth";

const router = express.Router();

router.get("/lists", isAuthorized, getUserLists);
router.post("/create", isAuthorized, createList);

export default router;
