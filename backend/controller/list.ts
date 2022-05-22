import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import List from "../models/List";
import Movie from "../models/Movie";

const getList = async (req: Request, res: Response) => {
    try {
        const { listId } = req.params;

        if (!listId.trim()) {
            return res
                .status(400)
                .send({ success: false, message: "List does not exist" });
        }

        const list = await List.findById(
            listId,
            "-owner -updatedAt -__v"
        ).populate("movies");

        if (!list) {
            return res
                .status(404)
                .send({ success: false, message: "List does not exist" });
        }

        return res.status(200).send({ success: true, list });
    } catch (err) {
        return res
            .status(404)
            .send({ success: false, message: "List was not found" });
    }
};

const getUserLists = async (req: Request, res: Response) => {
    const { id } = req.user;

    const userLists = await List.find(
        {
            owner: new mongoose.Types.ObjectId(id),
        },
        "-owner -updatedAt -__v"
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
    const { listId } = req.params;
    const { movie } = req.body;
    let movieId: Types.ObjectId;

    if (!listId || !movie) {
        return res
            .status(400)
            .send({ success: false, message: "Missing movie or id" });
    }

    const foundMovie = await Movie.findOne({ id: movie.id });

    if (!foundMovie) {
        const movieGenres = movie.genres.map(
            (genre: { name: string; id: number }) => genre.name
        );
        ({ _id: movieId } = await Movie.create({
            backdrop_path: movie.backdrop_path,
            budget: movie.budget,
            genres: movieGenres,
            id: movie.id,
            title: movie.title || movie.original_title,
            overview: movie.overview,
            popularity: movie.popularity,
            release_date: movie.release_date,
            runtime: movie.runtime,
            tagline: movie.tagline,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
        }));
    } else {
        movieId = foundMovie._id;
    }

    const list = await List.findById(listId);
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

const deleteList = async (req: Request, res: Response) => {
    const { listId } = req.params;

    if (!listId.trim()) {
        return res
            .status(400)
            .send({ success: false, message: "List does not exist" });
    }

    await List.findByIdAndDelete(listId);

    return res.status(200).send({ success: true, message: "List was deleted" });
};

const deleteMovieFromList = async (req: Request, res: Response) => {
    const { listId, movieId } = req.params;

    if (!listId.trim() || !movieId.trim()) {
        return res.status(400).send("List or movie don't exist");
    }

    try {
        const list = await List.findByIdAndUpdate(
            listId,
            { $pull: { movies: { $in: movieId } } },
            { new: true }
        )
            .select("-owner -updatedAt -__v")
            .populate("movies");

        res.status(200).send({
            success: true,
            message: "Movie was removed from list",
            list,
        });
    } catch (err) {
        res.status(404).send({
            sucess: false,
            message: "List or movie was not found",
        });
    }
};

export {
    getUserLists,
    createList,
    addMovieToList,
    deleteList,
    getList,
    deleteMovieFromList,
};
