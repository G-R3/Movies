import express from "express";
import {
    getMovie,
    getMovies,
    getTrending,
    searchMovie,
} from "../controller/movie";

const router = express.Router();

router.get("/movies", getMovies);
router.get("/movies/trending", getTrending);
router.get("/movies/:movieId", getMovie);
router.get("/movies/search/:query", searchMovie);

export default router;
