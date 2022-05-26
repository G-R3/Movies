import { memo, useState } from "react";
import {
    Box,
    Skeleton,
    SkeletonText,
    Image,
    Heading,
    Text,
    useColorMode,
    HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

type MovieProps = {
    movie: {
        id: number;
        title: string;
        image?: string;
        overview: string;
        backdrop_path: string;
        vote_average: number;
        release_date: string;
        adult: boolean;
    };
};

const Card = ({ movie }: MovieProps): JSX.Element => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const { colorMode } = useColorMode();
    const releaseYear = new Date(movie.release_date).getFullYear();

    return (
        <Box
            key={movie.id}
            role="group"
            _focus={{ outline: "none", transform: "scale(1.01)" }}
            _hover={{ transform: "scale(1.01)" }}
            transition="transform 200ms ease"
        >
            <Link to={`/browse/${movie.id}`}>
                <Skeleton isLoaded={imageLoaded}>
                    <Image
                        borderTopRadius="md"
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        onLoad={() => setImageLoaded(true)}
                    />
                </Skeleton>
                <Box paddingTop={2} paddingBottom={2} borderBottomRadius="md">
                    <HStack fontSize={"sm"}>
                        {releaseYear && (
                            <SkeletonText noOfLines={1} isLoaded={imageLoaded}>
                                <Text
                                    color={
                                        colorMode === "light"
                                            ? "gray.500"
                                            : "gray.400"
                                    }
                                    _after={{
                                        content: "'\\2022'",
                                        display: "inline-block",
                                        ml: "5px",
                                    }}
                                >
                                    {releaseYear}
                                </Text>
                            </SkeletonText>
                        )}
                        {movie.vote_average !== 0 && (
                            <SkeletonText noOfLines={1} isLoaded={imageLoaded}>
                                <Text
                                    color={
                                        colorMode === "light"
                                            ? "gray.500"
                                            : "gray.400"
                                    }
                                    _after={{
                                        content: "'\\2022'",
                                        display: "inline-block",
                                        ml: "5px",
                                    }}
                                >
                                    {movie.vote_average}
                                </Text>
                            </SkeletonText>
                        )}
                        <SkeletonText noOfLines={1} isLoaded={imageLoaded}>
                            <Text
                                color={
                                    colorMode === "light"
                                        ? "gray.500"
                                        : "gray.400"
                                }
                            >
                                {movie.adult ? "18+" : "PG"}
                            </Text>
                        </SkeletonText>
                    </HStack>
                    <SkeletonText
                        noOfLines={1}
                        w="full"
                        mt={2}
                        isLoaded={imageLoaded}
                    >
                        <Heading
                            mt={"1"}
                            as="h2"
                            fontSize={{ sm: "xs", md: "sm", lg: "md" }}
                        >
                            {movie.title}
                        </Heading>
                    </SkeletonText>
                </Box>
            </Link>
        </Box>
    );
};

export default memo(Card);
