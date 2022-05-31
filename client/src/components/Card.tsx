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
    Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

type MovieProps = {
    movie: {
        id: number;
        title: string;
        image?: string;
        overview: string;
        backdrop_path: string;
        poster_path: string;
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
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        onLoad={() => setImageLoaded(true)}
                    />
                </Skeleton>
                <Box
                    transition="all 350ms ease"
                    transform={"translateY(-50px)"}
                    opacity="0"
                    _groupHover={{
                        transform: "translateY(0)",
                        opacity: 1,
                    }}
                    paddingTop={2}
                    paddingBottom={2}
                    borderBottomRadius="md"
                >
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
                        <Tooltip
                            label={movie.title}
                            placement="bottom-start"
                            openDelay={500}
                        >
                            <Heading
                                mt={"1"}
                                as="h2"
                                fontSize={"xs"}
                                noOfLines={1}
                            >
                                {movie.title}
                            </Heading>
                        </Tooltip>
                    </SkeletonText>
                </Box>
            </Link>
        </Box>
    );
};

export default memo(Card);
