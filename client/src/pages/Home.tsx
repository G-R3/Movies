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
import { CSSProperties, useEffect, useState } from "react";
import { getTrending } from "../api";
import AuthForm from "../components/AuthForm";

const Home = (): JSX.Element => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isMobile] = useMediaQuery("(max-width: 48em)");
    const [images, setImages] = useState<string[]>([]);

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
    }, []);

    return (
        <>
            {isMobile ? (
                <Flex
                    h="full"
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={{ base: "center", md: "flex-start" }}
                    mt={{ base: "32", md: "0" }}
                    textAlign={{ base: "center", sm: "start" }}
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
                    <Button
                        mt="5"
                        colorScheme="purple"
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight={"semibold"}
                        padding={{ base: 4, md: 6 }}
                        onClick={() => onOpen()}
                    >
                        Get Started
                    </Button>
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
                            alignItems={{ base: "center", md: "flex-start" }}
                            mt={{ base: "32", md: "0" }}
                            textAlign={{ base: "center", sm: "start" }}
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
                            <Button
                                mt="5"
                                colorScheme="purple"
                                fontSize={{ base: "md", md: "lg" }}
                                fontWeight={"semibold"}
                                padding={{ base: 4, md: 6 }}
                                onClick={() => onOpen()}
                            >
                                Get Started
                            </Button>
                            <AuthForm isOpen={isOpen} onClose={onClose} />
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={{ base: 1, md: 4, lg: 5, xl: 6 }}>
                        <VStack h="full" alignItems="start" gap={10} mt={"8"}>
                            <Flex gap={10}>
                                <Image
                                    w="auto"
                                    h="230px"
                                    borderRadius={10}
                                    shadow={"2xl"}
                                    className={"img-place"}
                                    style={{ "--order": 1 } as CSSProperties}
                                    src={`https://image.tmdb.org/t/p/w1280${images[0]}`}
                                />
                                <Image
                                    w="auto"
                                    h="230px"
                                    borderRadius={10}
                                    shadow={"2xl"}
                                    className={"img-place"}
                                    style={{ "--order": 2 } as CSSProperties}
                                    src={`https://image.tmdb.org/t/p/w1280${images[1]}`}
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
                                    w="auto"
                                    h="230px"
                                    borderRadius={10}
                                    shadow={"2xl"}
                                    className={"img-place"}
                                    style={{ "--order": 3 } as CSSProperties}
                                    src={`https://image.tmdb.org/t/p/w1280${images[2]}`}
                                />
                                <Image
                                    w="auto"
                                    h="230px"
                                    borderRadius={10}
                                    shadow={"2xl"}
                                    className={"img-place"}
                                    style={{ "--order": 4 } as CSSProperties}
                                    src={`https://image.tmdb.org/t/p/w1280${images[3]}`}
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
