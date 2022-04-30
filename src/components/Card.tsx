import { useState } from "react";
import { Box, Skeleton, Image, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type MovieProps = {
    movie: {
        id: string;
        title: string;
        image?: string;
        overview: string;
        backdrop_path: string;
    };
};

const Card = ({ movie }: MovieProps): JSX.Element => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Box
            key={movie.id}
            role="group"
            _focus={{ outline: "none", transform: "scale(1.01)" }}
            _hover={{ transform: "scale(1.01)" }}
            transition="transform 200ms ease"
        >
            <Link to={`/browse/${movie.id}`}>
                <Skeleton
                    isLoaded={imageLoaded}
                    startColor="gray.500"
                    endColor="gray.700"
                >
                    <Image
                        borderTopRadius="md"
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        onLoad={() => setImageLoaded(true)}
                    />
                </Skeleton>
                <Box
                    p="5"
                    backgroundColor="blackAlpha.600"
                    shadow="2xl"
                    borderBottomRadius="md"
                    transition="background-color 200ms ease"
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
    );
};

export default Card;
