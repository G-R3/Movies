import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    Skeleton,
    Center,
} from "@chakra-ui/react";
import Cast from "../components/Cast";
import Carousel from "../components/Carousel";
import ListMenu from "../components/ListMenu";
import Loader from "../components/Loader";
import moment from "moment";

import GenreTag from "../components/GenreTag";
import { numberFormat, minutesToHrsMins } from "../utils/index";

const MoviePage = (): JSX.Element => {
    const { movieId } = useParams<string>();
    const [data, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await fetch(`/api/movies/${movieId}`);

            if (response.status === 404) {
                navigate("/404", { replace: true });
            }

            const data = await response.json();

            setData(data.data);
            setIsLoading(false);
        };

        fetchData();
    }, [movieId]);

    if (isLoading) {
        return (
            <Box mt={20}>
                <Loader size="xl" />
            </Box>
        );
    }

    const { movie, cast, recommendations } = data;

    const formattedDate: string = moment(movie.release_date).format(
        "MMM D, YYYY"
    );

    return (
        <Flex direction="column" justifyContent="space-between" gap={20}>
            <SimpleGrid
                columns={{ md: 1, lg: 2 }}
                spacingX={{ md: "40px", xl: "0" }}
                backgroundPosition="center"
                backgroundSize={"cover"}
                backgroundRepeat="no-repeat"
                paddingY={5}
                paddingX={2}
                borderRadius={"md"}
                style={{
                    backgroundImage: `
                    linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.3) 100%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            >
                <Center>
                    <Skeleton isLoaded={imageLoaded}>
                        <Image
                            w={{ base: "250px", sm: "350px", lg: "400px" }}
                            borderRadius="lg"
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title}
                            shadow="dark-lg"
                            onLoad={() => setImageLoaded(true)}
                        />
                    </Skeleton>
                </Center>
                <Flex direction="column" height="full" mt={{ md: 10, lg: 0 }}>
                    <Flex
                        flexWrap="wrap"
                        mt={{ base: 10, md: 0 }}
                        justifyContent={"space-between"}
                    >
                        <HStack>
                            {movie.genres.map((genre: any) => (
                                <GenreTag key={genre.id} name={genre.name} />
                            ))}
                        </HStack>
                        <ListMenu movie={movie} />
                    </Flex>
                    <Flex direction="column" gap={1}>
                        <Heading
                            as="h1"
                            fontSize={{
                                base: "xl",
                                md: "2xl",
                                lg: "4xl",
                            }}
                            mt={2}
                        >
                            {movie.title}
                        </Heading>
                        <Text as={"i"} color="gray.400" fontWeight="semibold">
                            {movie.tagline}
                        </Text>
                        <Text mt={2}>{movie.overview}</Text>
                    </Flex>
                    <HStack mt={20} textAlign="center">
                        <Stat>
                            <StatLabel
                                color="gray.500"
                                fontSize="md"
                                fontWeight="normal"
                            >
                                Release Date
                            </StatLabel>
                            <StatNumber fontSize="sm" fontWeight="bold">
                                {formattedDate !== "Invalid date"
                                    ? formattedDate
                                    : "N/A"}
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
                                {movie.runtime
                                    ? minutesToHrsMins(movie.runtime)
                                    : "N/A"}
                            </StatNumber>
                        </Stat>
                    </HStack>
                </Flex>
            </SimpleGrid>

            <Flex
                direction={{ base: "column", sm: "row" }}
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
            >
                {recommendations?.length > 0 ? (
                    <Carousel data={recommendations} heading="Recommended" />
                ) : (
                    <></>
                )}

                {cast.length > 0 ? <Cast cast={cast.slice(0, 20)} /> : <></>}
            </Flex>
        </Flex>
    );
};

export default MoviePage;
