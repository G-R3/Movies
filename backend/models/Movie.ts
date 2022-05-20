import mongoose, { model, Types } from "mongoose";

const { Schema } = mongoose;

interface IMovie {
    name: string;
    image: string;
    budget: number;
    genres: string[];
    movieId: number;
    overview: string;
    popularity: number;
    releaseDate: string;
    runtime: number;
    tagline: string;
    voteAverage: number;
    voteCount: number;
}

const movieSchema = new Schema<IMovie>(
    {
        budget: Number,
        genres: [String],
        movieId: Number,
        name: { type: String, required: true },
        overview: String,
        popularity: Number,
        releaseDate: String,
        runtime: Number,
        tagline: String,
        voteAverage: Number,
        voteCount: Number,
    },
    { timestamps: true }
);

const Movie = model<IMovie>("Movie", movieSchema);

export default Movie;
