import {
    InputGroup,
    InputRightElement,
    Input,
    Box,
    Text,
    useDisclosure,
    useColorModeValue,
    useOutsideClick,
    ScaleFade,
    chakra,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { searchMovie } from "../api";

const Fade = chakra(ScaleFade);

interface Movie {
    backdrop_path: string;
    budget: number;
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

export default function Search() {
    const [value, setValue] = useState<string>("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
    const ref = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const bg = useColorModeValue("gray.100", "gray.900");
    const bgAlt = useColorModeValue(
        "RGBA(0, 0, 0, 0.16)",
        "RGBA(255, 255, 255, 0.16)"
    );

    useEffect(() => {
        if (!value.trim()) {
            onClose();
            return;
        }

        const fetchMovies = async () => {
            const movies = await searchMovie(value);
            setMovies(movies.results);
        };

        onOpen();
        fetchMovies();
    }, [value]);

    useOutsideClick({
        ref,
        handler: () => {
            onClose();
        },
    });

    const openList = () => {
        if (!value.trim()) return null;
        onToggle();
        return null;
    };

    return (
        <InputGroup
            ml="auto"
            alignItems="flex-start"
            flexDirection="column"
            width="300px"
            ref={ref}
        >
            <Input
                width="100%"
                type="text"
                placeholder="Search Movies"
                ref={inputRef}
                value={value}
                onFocus={openList}
                onChange={(e) => setValue(e.target.value)}
            />
            {/* eslint-disable-next-line react/no-children-prop */}
            <InputRightElement pointerEvents="none" children={<SearchIcon />} />
            {movies && movies.length && isOpen ? (
                <Fade
                    initialScale={0.9}
                    in={isOpen}
                    width="full"
                    position="absolute"
                    top="45px"
                    zIndex={2}
                >
                    <Box
                        bg={bg}
                        shadow="2xl"
                        borderRadius="md"
                        height="auto"
                        maxHeight="350px"
                        overflowY="scroll"
                        paddingTop={1}
                        paddingBottom={1}
                        css={{
                            "&::-webkit-scrollbar": {
                                width: "4px",
                            },
                            "&::-webkit-scrollbar-track": {
                                width: "6px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                background: bgAlt,
                                borderRadius: "24px",
                            },
                        }}
                    >
                        {movies.map((movie: Movie) => {
                            return (
                                <Link to={`/browse/${movie.id}`} key={movie.id}>
                                    <Text
                                        width="full"
                                        padding={2}
                                        borderRadius="sm"
                                        fontSize="sm"
                                        _hover={{
                                            backgroundColor: bgAlt,
                                        }}
                                    >
                                        {movie.title}
                                    </Text>
                                </Link>
                            );
                        })}
                    </Box>
                </Fade>
            ) : (
                ""
            )}
        </InputGroup>
    );
}
