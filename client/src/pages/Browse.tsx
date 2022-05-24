import { useEffect, useState } from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import Card from "../components/Card";

import { getMovies, getTrending } from "../api/index";
import Carousel from "../components/Carousel";
import Search from "../components/Search";
import Loader from "../components/Loader";

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

const Browse = (): JSX.Element => {
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [trending, setTrending] = useState<Movie[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const movies = await getMovies();
            const trending = await getTrending();

            setMovies(movies.results);
            setTrending(trending.results);
        };

        fetchData();
    }, []);

    if (!movies)
        return (
            <Box mt={20}>
                <Loader size="xl" />
            </Box>
        );

    return (
        <Box mt={"14"}>
            <Search />
            <Box>
                <Carousel data={trending} heading="Trending" />
            </Box>

            <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 3 }}
                spacing={10}
                mt={"24"}
            >
                {movies.map((movie) => (
                    <Card key={movie.id} movie={movie} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default Browse;
