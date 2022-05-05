import { useEffect, useState } from "react";
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
import { getMovie } from "../api";
import GenreTag from "../components/Tag";
import { numberFormat, minutesToHrsMins } from "../utils/index";

interface Genres {
    id: number;
    name: string;
}
interface Movie {
    adult: false;
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

const MoviePage = () => {
    const { movieId } = useParams<string>();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMovie(movieId!);
            console.log(data);
            setMovie(data);
        };

        fetchData();
    }, []);

    if (!movie) return <p>Loading..</p>;
    return (
        <Flex direction="column" justifyContent="space-between" h="full">
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
                <Flex direction="column">
                    <Flex direction="row" gap={3} mt={3}>
                        {movie.genres.map((genre) => (
                            <GenreTag key={genre.id} name={genre.name} />
                        ))}
                    </Flex>
                    <Flex direction="column" gap={1} flex="1 0 0">
                        <Heading
                            as="h1"
                            fontSize={{
                                base: "2xl",
                                md: "3xl",
                                lg: "6xl",
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
                mt={{ base: 14, md: 24, lg: 28 }}
                gap={{ base: 9, md: "0" }}
            >
                <Stat>
                    <StatLabel
                        fontSize="md"
                        textAlign="center"
                        color="gray.500"
                        fontWeight="normal"
                    >
                        Rating
                    </StatLabel>
                    <StatNumber
                        fontSize="4xl"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        {movie.vote_average}
                        <chakra.span fontSize="2xl" color="gray.500">
                            {" "}
                            / 10
                        </chakra.span>
                    </StatNumber>
                </Stat>
                <Stat>
                    <StatLabel
                        fontSize="md"
                        textAlign="center"
                        color="gray.500"
                        fontWeight="normal"
                    >
                        Vote Count
                    </StatLabel>
                    <StatNumber
                        fontSize="4xl"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        {numberFormat(movie.vote_count)}{" "}
                        <chakra.span fontSize="2xl" color="gray.500">
                            {" "}
                            votes
                        </chakra.span>
                    </StatNumber>
                </Stat>
                <Stat>
                    <StatLabel
                        fontSize="md"
                        textAlign="center"
                        color="gray.500"
                        fontWeight="normal"
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
        </Flex>
    );
};

export default MoviePage;
