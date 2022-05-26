import { Request, Response } from "express";
import axios from "axios";

interface MovieCast {
    cast_id: number;
    name: string;
    character: string;
    id: number;
    profile_path: string;
}

interface Movie {
    backdrop_path: string;
    budget: number;
    genres: [];
    id: number;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    runtime: number;
    title: string;
    tagline: string;
    vote_average: number;
    vote_count: number;
}

const getMovies = async (req: Request, res: Response) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        );

        res.status(200).send({
            success: true,
            data: response.data,
        });
    } catch (err) {
        res.status(404).send({
            success: false,
            message: "Something went wrong fetching movies",
        });
    }
};

const getMovie = async (req: Request, res: Response) => {
    try {
        const { movieId } = req.params;
        if (!movieId.trim()) {
            return res.status(400).send({
                success: false,
                message: "Invalid movie id",
            });
        }

        const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`;
        const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.API_KEY}&language=en-US`;
        const recommendedUrl = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`;

        const data = await axios
            .all([
                axios.get(movieUrl),
                axios.get(castUrl),
                axios.get(recommendedUrl),
            ])
            .then(
                axios.spread((movieData, castData, recommendedData) => {
                    const movie: Movie = {
                        backdrop_path: movieData.data.backdrop_path,
                        budget: movieData.data.budget,
                        genres: movieData.data.genres,
                        id: movieData.data.id,
                        original_title: movieData.data.original_title,
                        overview: movieData.data.overview,
                        popularity: movieData.data.popularity,
                        poster_path: movieData.data.poster_path,
                        release_date: movieData.data.release_date,
                        runtime: movieData.data.runtime,
                        title: movieData.data.title,
                        tagline: movieData.data.tagline,
                        vote_average: movieData.data.vote_average,
                        vote_count: movieData.data.vote_count,
                    };

                    const cast: MovieCast[] = castData.data.cast.map(
                        (cast: MovieCast) => ({
                            id: cast.id,
                            cast_id: cast.cast_id,
                            name: cast.name,
                            character: cast.character,
                            profile_path: cast.profile_path,
                        })
                    );

                    const recommendations: Movie[] =
                        recommendedData.data.results.map((movie: Movie) => ({
                            backdrop_path: movie.backdrop_path,
                            budget: movie.budget,
                            genres: movie.genres,
                            id: movie.id,
                            original_title: movie.original_title,
                            overview: movie.overview,
                            popularity: movie.popularity,
                            poster_path: movie.poster_path,
                            release_date: movie.release_date,
                            runtime: movie.runtime,
                            title: movie.title,
                            tagline: movie.tagline,
                            vote_average: movie.vote_average,
                            vote_count: movie.vote_count,
                        }));

                    return { movie, cast, recommendations };
                })
            );

        res.status(200).send({ success: true, data });
    } catch (err) {
        res.status(404).send({
            success: false,
            message: "Movie does not exist",
        });
    }
};

const getTrending = async (req: Request, res: Response) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}`
        );

        res.status(200).send({ success: true, data: response.data });
    } catch (err) {
        res.status(404).send({
            success: false,
            message: "Something went wrong fetching movies",
        });
    }
};

const searchMovie = async (req: Request, res: Response) => {
    try {
        const { query } = req.params;

        const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
        );

        res.status(200).send({ success: true, data: response.data.results });
    } catch (err) {
        res.status(404).send({
            success: false,
            message: "Something went wrong while searching for movies",
        });
    }
};

export { getMovies, getMovie, getTrending, searchMovie };
