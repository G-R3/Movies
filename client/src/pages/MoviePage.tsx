import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
    chakra,
    Box,
    Image,
    SimpleGrid,
    Flex,
    Heading,
    Text,
    Stat,
    StatLabel,
    StatNumber,
    HStack,
} from "@chakra-ui/react";
import Cast from "../components/Cast";
import Carousel from "../components/Carousel";
import ListMenu from "../components/ListMenu";
import { AuthContext } from "../context/Auth";

import { getMovie, getMovieCredits, getMovieRecommendations } from "../api";
import GenreTag from "../components/Tag";
import { numberFormat, minutesToHrsMins } from "../utils/index";

interface Genres {
    id: number;
    name: string;
}

interface MovieDetails {
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
}

interface MovieCast {
    cast_id: number;
    name: string;
    character: string;
    id: number;
    profile_path: string;
}

interface Movie {
    movie: MovieDetails;
    cast: MovieCast[];
}

const MoviePage = (): JSX.Element => {
    const { movieId } = useParams<string>();
    const [data, setdata] = useState<Movie>({} as Movie);
    const [recommended, setRecommended] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const movie = await getMovie(Number(movieId));
            const movieCredits = await getMovieCredits(Number(movieId));
            const recommendedMovies = await getMovieRecommendations(
                Number(movieId)
            );
            setdata({ movie, cast: movieCredits.cast });
            setRecommended(recommendedMovies.results);
            setIsLoading(false);
        };

        fetchData();
    }, [movieId]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const { movie, cast } = data;
    return (
        <Flex
            direction="column"
            justifyContent="space-between"
            h="full"
            gap={20}
        >
            <SimpleGrid
                columns={{ sm: 1, md: 2 }}
                spacingX="40px"
                mt={10}
                alignItems="center"
            >
                <Box>
                    <Image
                        borderRadius="lg"
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        shadow="dark-lg"
                    />
                </Box>
                <Flex direction="column" height="full">
                    <Flex
                        flexWrap="wrap"
                        mt={{ base: 10, md: 0 }}
                        justifyContent={"space-between"}
                    >
                        <HStack>
                            {movie.genres.map((genre) => (
                                <GenreTag key={genre.id} name={genre.name} />
                            ))}
                        </HStack>
                        {isLoggedIn && <ListMenu />}
                    </Flex>
                    <Flex direction="column" gap={1} flex="1 0 0">
                        <Heading
                            as="h1"
                            fontSize={{
                                base: "2xl",
                                md: "3xl",
                                lg: "5xl",
                            }}
                            mt={2}
                        >
                            {movie.title}
                        </Heading>
                        <Text color="gray.400" fontWeight="semibold">
                            {movie.tagline}
                        </Text>
                        <Text mt={2}>{movie.overview}</Text>
                    </Flex>
                    <HStack mt={10} textAlign="center">
                        <Stat>
                            <StatLabel
                                color="gray.500"
                                fontSize="md"
                                fontWeight="normal"
                            >
                                Release Date
                            </StatLabel>
                            <StatNumber fontSize="sm" fontWeight="bold">
                                {movie.release_date}
                            </StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel
                                color="gray.500"
                                fontSize="md"
                                fontWeight="normal"
                            >
                                Runtime
                            </StatLabel>
                            <StatNumber fontSize="sm" fontWeight="bold">
                                {minutesToHrsMins(movie.runtime)}
                            </StatNumber>
                        </Stat>
                    </HStack>
                </Flex>
            </SimpleGrid>
            <Flex
                direction={{ base: "column", md: "row" }}
                mt={10}
                gap={{ base: 9, md: "0" }}
            >
                <Stat>
                    <StatLabel
                        textAlign="center"
                        color="gray.500"
                        fontWeight="normal"
                        fontSize={"lg"}
                    >
                        Rating
                    </StatLabel>
                    <StatNumber
                        fontSize="4xl"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        {movie.vote_average}
                        <chakra.span fontSize="lg" color="gray.500">
                            {" "}
                            / 10
                        </chakra.span>
                    </StatNumber>
                </Stat>
                <Stat>
                    <StatLabel
                        textAlign="center"
                        color="gray.500"
                        fontWeight="normal"
                        fontSize={"lg"}
                    >
                        Vote Count
                    </StatLabel>
                    <StatNumber
                        fontSize="4xl"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        {numberFormat(movie.vote_count)}{" "}
                        <chakra.span fontSize="xl" color="gray.500">
                            {" "}
                            votes
                        </chakra.span>
                    </StatNumber>
                </Stat>
                <Stat>
                    <StatLabel
                        textAlign="center"
                        color="gray.500"
                        fontWeight="normal"
                        fontSize={"lg"}
                    >
                        Budget
                    </StatLabel>
                    <StatNumber
                        fontSize="4xl"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        {movie.budget !== 0
                            ? `$${numberFormat(movie.budget)}`
                            : "N/A"}
                    </StatNumber>
                </Stat>
            </Flex>

            <Flex
                flexDirection="column"
                gap={20}
                mt={{ base: 14, md: 16, lg: 20 }}
                paddingBottom={"10"}
            >
                {recommended?.length > 0 ? (
                    <Carousel data={recommended} heading="Recommended" />
                ) : (
                    <></>
                )}
                <Cast cast={cast.slice(0, 20)} />
            </Flex>
        </Flex>
    );
};

export default MoviePage;
