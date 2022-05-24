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
} from "@chakra-ui/react";
import { CSSProperties } from "react";
import AuthForm from "../components/AuthForm";

const Home = (): JSX.Element => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Grid
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(12,1fr)",
                }}
                gap={6}
            >
                <GridItem colSpan={{ base: 1, md: 7, xl: 6 }}>
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
                <GridItem
                    colSpan={{ base: 1, md: 5, xl: 6 }}
                    display={{ base: "none", md: "block" }}
                >
                    <VStack h="full" alignItems="start" gap={10} mt={"8"}>
                        <Flex gap={10}>
                            <Box
                                w="350px"
                                h="230px"
                                bg="tomato"
                                borderRadius={10}
                                shadow={"2xl"}
                                className={"img-place"}
                                style={{ "--order": 1 } as CSSProperties}
                            ></Box>
                            <Box
                                w="350px"
                                h="230px"
                                bg="tomato"
                                borderRadius={10}
                                shadow={"2xl"}
                                className={"img-place"}
                                style={{ "--order": 2 } as CSSProperties}
                            ></Box>
                        </Flex>
                        <Flex gap={10}>
                            <Box
                                w="50"
                                h="50"
                                bg="tomato"
                                borderRadius={10}
                            ></Box>
                            <Box
                                w="350px"
                                h="230px"
                                bg="tomato"
                                borderRadius={10}
                                shadow={"2xl"}
                                className={"img-place"}
                                style={{ "--order": 3 } as CSSProperties}
                            ></Box>
                            <Box
                                w="350px"
                                h="230px"
                                bg="tomato"
                                borderRadius={10}
                                shadow={"2xl"}
                                className={"img-place"}
                                style={{ "--order": 4 } as CSSProperties}
                            ></Box>
                        </Flex>
                    </VStack>
                </GridItem>
            </Grid>
        </>
    );
};

export default Home;
