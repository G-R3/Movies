import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "../api";

interface Genres {
    id: number;
    name: string;
}
interface Movie {
    title: string;
    backdrop_path: string;
    genres: Genres[];
    tagline: string;
    overview: string;
}

const MoviePage = () => {
    const { movieId } = useParams<string>();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMovie(movieId!);
            setMovie(data);
        };

        fetchData();
    }, []);

    if (!movie) return <p>Loading..</p>;
    return (
        <div className="mt-5">
            <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="rounded-md"
            />
            <div className="mt-3">
                <div className="flex gap-2">
                    {movie.genres.map((genre) => (
                        <span key={genre.id}>{genre.name}</span>
                    ))}
                </div>
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl">{movie.title}</h1>
                    <p className="text-slate-500">{movie.tagline}</p>
                    <p>{movie.overview}</p>
                </div>
            </div>
        </div>
    );
};

export default MoviePage;
