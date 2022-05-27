import {
    Button,
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    Text,
    VStack,
    useDisclosure,
    useMediaQuery,
    Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CSSProperties, useContext, useEffect, useState } from "react";
import { getTrending } from "../api";
import AuthForm from "../components/AuthForm";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";

const Home = (): JSX.Element => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isMobile] = useMediaQuery("(max-width: 48em)");
    const [images, setImages] = useState<string[]>([]);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (isMobile) return;
        const fetchData = async () => {
            const trending = await getTrending();
            const images = trending.data.results
                .slice(0, 4)
                .map((movie: any) => movie.backdrop_path);

            setImages(images);
        };

        fetchData();
    }, [isMobile]);

    if (!images.length && !isMobile) return <Loader size="xl" />;

    return (
        <>
            {isMobile ? (
                <Flex
                    h="full"
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mt={"32"}
                    className="home-header"
                >
                    <Heading fontSize={"4xl"}>Movie Manager</Heading>
                    <Text fontSize={"md"}>Track and organize your movies</Text>
                    {isLoggedIn === false ? (
                        <Button
                            mt="5"
                            colorScheme="purple"
                            fontSize={"md"}
                            fontWeight={"semibold"}
                            padding={4}
                            onClick={() => onOpen()}
                        >
                            Get Started
                        </Button>
                    ) : isLoggedIn === true ? (
                        <Button
                            as={Link}
                            to="/browse"
                            mt="5"
                            colorScheme="purple"
                            fontSize={"md"}
                            fontWeight={"semibold"}
                            padding={4}
                            onClick={() => onOpen()}
                        >
                            Browse
                        </Button>
                    ) : (
                        <></>
                    )}
                    <AuthForm isOpen={isOpen} onClose={onClose} />
                </Flex>
            ) : (
                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(12,1fr)",
                    }}
                    gap={6}
                >
                    <GridItem colSpan={{ base: 1, md: 8, lg: 7, xl: 6 }}>
                        <Flex
                            h="full"
                            flexDirection={"column"}
                            justifyContent={"center"}
                            alignItems="flex-start"
                            className="home-header"
                        >
                            <Heading
                                fontSize={{
                                    base: "4xl",
                                    md: "5xl",
                                    lg: "6xl",
                                    xl: "7xl",
                                }}
                            >
                                Movie Manager
                            </Heading>
                            <Text fontSize={{ base: "md", md: "lg", lg: "xl" }}>
                                Track and organize your movies
                            </Text>
                            {isLoggedIn === false ? (
                                <Button
                                    mt="5"
                                    colorScheme="purple"
                                    fontSize={"md"}
                                    fontWeight={"semibold"}
                                    padding={4}
                                    onClick={() => onOpen()}
                                >
                                    Get Started
                                </Button>
                            ) : isLoggedIn === true ? (
                                <Button
                                    as={Link}
                                    to="/browse"
                                    mt="5"
                                    colorScheme="purple"
                                    fontSize={"md"}
                                    fontWeight={"semibold"}
                                    padding={4}
                                    onClick={() => onOpen()}
                                >
                                    Browse
                                </Button>
                            ) : (
                                <></>
                            )}
                            <AuthForm isOpen={isOpen} onClose={onClose} />
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 4, lg: 5, xl: 6 }}>
                        <VStack h="full" alignItems="start" gap={10} mt={"8"}>
                            <Flex gap={10}>
                                <Image
                                    w="full"
                                    h="auto"
                                    borderRadius={10}
                                    shadow={"2xl"}
                                    className={"img-place"}
                                    style={{ "--order": 1 } as CSSProperties}
                                    src={`https://image.tmdb.org/t/p/w500${images[0]}`}
                                />
                                <Image
                                    w="full"
                                    h="auto"
                                    borderRadius={10}
                                    shadow={"2xl"}
                                    className={"img-place"}
                                    style={{ "--order": 2 } as CSSProperties}
                                    src={`https://image.tmdb.org/t/p/w500${images[1]}`}
                                />
                            </Flex>
                            <Flex gap={10}>
                                <Box
                                    w="50"
                                    h="50"
                                    bg="tomato"
                                    borderRadius={10}
                                ></Box>
                                <Image
                                    w="full"
                                    h="auto"
                                    borderRadius={10}
                                    shadow={"2xl"}
                                    className={"img-place"}
                                    style={{ "--order": 3 } as CSSProperties}
                                    src={`https://image.tmdb.org/t/p/w500${images[2]}`}
                                />
                                <Image
                                    w="full"
                                    h="auto"
                                    borderRadius={10}
                                    shadow={"2xl"}
                                    className={"img-place"}
                                    style={{ "--order": 4 } as CSSProperties}
                                    src={`https://image.tmdb.org/t/p/w500${images[3]}`}
                                />
                            </Flex>
                        </VStack>
                    </GridItem>
                </Grid>
            )}
        </>
    );
};

export default Home;
