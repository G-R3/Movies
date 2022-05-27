import { useCallback, useEffect, useRef, useState } from "react";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import Card from "../components/Card";

import { getTrending } from "../api/index";
import Carousel from "../components/Carousel";
import Search from "../components/Search";
import Loader from "../components/Loader";
import useInView from "../hooks/useInView";

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
    const [trending, setTrending] = useState<Movie[] | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const { movies, isLoading, error, hasMore } = useInView(pageNumber);

    const observer = useRef<any>(null);
    const boxRef = useCallback(
        (node: any) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNumber((prev) => prev + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    useEffect(() => {
        const fetchData = async () => {
            const trending = await getTrending();
            setTrending(trending.data.results);
        };

        fetchData();
    }, []);

    if (!movies || !trending)
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
                {movies.map((movie: Movie) => (
                    <Card key={movie.id} movie={movie} />
                ))}
            </SimpleGrid>
            <Box paddingY={10} ref={boxRef}>
                {isLoading ? (
                    <Loader size="xl" />
                ) : error ? (
                    <Text
                        textAlign={"center"}
                        fontSize="xl"
                        color={"gray.400"}
                        fontWeight="semibold"
                    >
                        Something went wrong
                    </Text>
                ) : (
                    ""
                )}
            </Box>
        </Box>
    );
};

export default Browse;
