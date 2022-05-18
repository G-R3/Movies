import express from "express";
import { createList } from "../controller/list";
import isAuthorized from "../middleware/auth";

const router = express.Router();

router.post("/create", isAuthorized, createList);

export default router;
