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
} from "@chakra-ui/react";
import { getMovie } from "../api";
import GenreTag from "../components/Tag";

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
    vote_average: number;
    vote_count: number;
    budget: number;
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
        <Flex direction="column" justifyContent="space-between" h="full">
            <SimpleGrid columns={{ sm: 1, md: 2 }} spacingX="40px" mt={10}>
                <Box>
                    <Image
                        borderRadius="md"
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        shadow="2xl"
                    />
                </Box>
                <Box>
                    <Flex direction="row" gap={3} mt={3}>
                        {movie.genres.map((genre) => (
                            <GenreTag key={genre.id} name={genre.name} />
                        ))}
                    </Flex>
                    <Flex direction="column" gap={1}>
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
                </Box>
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
                    >
                        Vote Count
                    </StatLabel>
                    <StatNumber
                        fontSize="4xl"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        {movie.vote_count}{" "}
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
                    >
                        Budget
                    </StatLabel>
                    <StatNumber
                        fontSize="4xl"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        ${movie.budget}{" "}
                        <chakra.span fontSize="2xl" color="gray.500">
                            {" "}
                            usd
                        </chakra.span>
                    </StatNumber>
                </Stat>
            </Flex>
        </Flex>
    );
};

export default MoviePage;
