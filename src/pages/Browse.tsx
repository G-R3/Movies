import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../api/index";

const Browse = (): JSX.Element => {
    const [movies, setMovies] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMovies();
            setMovies(data.results);
        };

        fetchData();
    }, []);
    if (!movies) return <p>Loading...</p>;
    return (
        <div className="max-w-fullxl">
            <h1 className="text-5xl my-5">Browse</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {movies.map((movie) => (
                    <Link
                        to={`/browse/${movie.id}`}
                        key={movie.id}
                        className="hover:shadow-md transition-shadow"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title}
                            className="rounded-t-md"
                        />
                        <div className="rounded-b-md p-4 bg-neutral-100 text-neutral-800">
                            <h2 className="text-xl">{movie.title}</h2>
                            <p className="two-line-ellipsis my-2">
                                {movie.overview}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Browse;
