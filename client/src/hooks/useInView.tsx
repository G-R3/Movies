import { useEffect, useState } from "react";
import { getMovies } from "../api";

interface Genres {
    id: number;
    name: string;
}

interface Movie {
    backdrop_path: string;
    budget: number;
    genres: Genres[];
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
    adult: boolean;
}

const useInView = (pageNumber: number) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        if (pageNumber >= 500) {
            setHasMore(false);
            setError(true);
            return;
        }
        const fetchMovies = async () => {
            setIsLoading(true);
            setError(false);
            try {
                const movies = await getMovies(pageNumber);

                if (pageNumber === 1) {
                    setMovies(movies.data.results);
                } else {
                    setMovies((prevMovies): Movie[] => {
                        return [...prevMovies, ...movies.data.results];
                    });
                }

                setIsLoading(false);
            } catch (err) {
                setError(true);
            }
        };
        fetchMovies();
    }, [pageNumber]);

    return { movies, isLoading, error, hasMore };
};

export default useInView;
