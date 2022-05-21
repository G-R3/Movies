import mongoose, { model, Types } from "mongoose";

const { Schema } = mongoose;

interface IMovie {
    title: string;
    backdrop_path: string;
    budget: number;
    genres: string[];
    id: number;
    overview: string;
    popularity: number;
    release_date: string;
    runtime: number;
    tagline: string;
    vote_average: number;
    vote_count: number;
}

const movieSchema = new Schema<IMovie>(
    {
        backdrop_path: String,
        budget: Number,
        genres: [String],
        id: Number,
        title: { type: String, required: true },
        overview: String,
        popularity: Number,
        release_date: String,
        runtime: Number,
        tagline: String,
        vote_average: Number,
        vote_count: Number,
    },
    { timestamps: true }
);

const Movie = model<IMovie>("Movie", movieSchema);

export default Movie;
