import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heading, Text, SimpleGrid, Box, Image } from "@chakra-ui/react";
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
        <>
            <Heading fontSize="5xl" mt={10} mb={8}>
                Browse
            </Heading>
            <SimpleGrid columns={{ md: 3 }} spacing={10}>
                {movies.map((movie) => (
                    <Box
                        key={movie.id}
                        role="group"
                        _focus={{ outline: "none", transform: "scale(1.01)" }}
                        _hover={{ transform: "scale(1.01)" }}
                        transition="transform 200ms ease"
                    >
                        <Link to={`/browse/${movie.id}`}>
                            <Image
                                borderTopRadius="md"
                                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                alt={movie.title}
                            />
                            <Box
                                p="5"
                                backgroundColor="blackAlpha.600"
                                shadow="2xl"
                                borderBottomRadius="md"
                                _groupHover={{
                                    backgroundColor: "blackAlpha.900",
                                }}
                            >
                                <Heading
                                    as="h2"
                                    fontSize={{ sm: "xs", md: "sm", lg: "lg" }}
                                >
                                    {movie.title}
                                </Heading>
                                <Text noOfLines={2} mt="2" color="gray.400">
                                    {movie.overview}
                                </Text>
                            </Box>
                        </Link>
                    </Box>
                ))}
            </SimpleGrid>
        </>
    );
};

export default Browse;
