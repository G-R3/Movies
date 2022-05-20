import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import List from "../models/list";
import Movie from "../models/Movie";

const getUserLists = async (req: Request, res: Response) => {
    const { id } = req.user;

    const userLists = await List.find(
        {
            owner: new mongoose.Types.ObjectId(id),
        },
        "-owner -updatedAt -__v-_id"
    );

    return res.status(200).send({ success: true, lists: userLists });
};

const createList = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const { id } = req.user;

        if (!title) {
            return res
                .status(400)
                .send({ success: false, message: "Title is required" });
        }
        if (description && description.length > 200) {
            return res.status(400).send({
                success: false,
                message:
                    "Description most be equal to or less than 200 characters",
            });
        }

        const list = await List.create({
            title,
            description,
            owner: id,
        });

        res.status(200).send({
            success: true,
            message: "New list created",
            list: { _id: list._id, title: list.title },
        });
    } catch (err) {
        console.log("ERROR, likely some validation error when creating list");
        console.log(err);
    }
};

const addMovieToList = async (req: Request, res: Response) => {
    const { id, movie } = req.body;
    let movieId: Types.ObjectId;

    if (!id || !movie) {
        return res
            .status(400)
            .send({ seuccess: false, message: "Missing movie or id" });
    }

    // check if movie already exists
    const foundMovie = await Movie.findOne({ movieId: movie.id });

    if (!foundMovie) {
        const movieGenres = movie.genres.map(
            (genre: { name: string; id: number }) => genre.name
        );
        ({ _id: movieId } = await Movie.create({
            budget: movie.budget,
            genres: movieGenres,
            movieId: movie.id,
            name: movie.name || movie.original_title,
            overview: movie.overview,
            popularity: movie.popularity,
            releaseDate: movie.release_date,
            runtime: movie.runtime,
            tagline: movie.tagline,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
        }));
    } else {
        movieId = foundMovie._id;
    }

    const list = await List.findById(id);
    if (!list) {
        return res
            .status(404)
            .send({ success: false, message: "List does not exist" });
    }
    const movieInList = list?.movies.includes(movieId);

    if (movieInList) {
        return res
            .status(400)
            .send({ success: false, message: "Movie is already in this list" });
    }

    list?.movies.push(movieId);
    await list?.save();

    res.status(200).send({ success: true, message: "Movie added to list" });
};

export { getUserLists, createList, addMovieToList };
