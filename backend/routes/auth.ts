import express from "express";
import { register, login, logout, isLoggedIn } from "../controller/auth";
import validateAuth from "../middleware/validateAuth";

const router = express.Router();

router.post("/register", validateAuth, register);

router.post("/login", validateAuth, login);

router.get("/logout", logout);

router.get("/isLoggedIn", isLoggedIn);

export default router;
