import {
    Button,
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";

const Home = (): JSX.Element => {
    return (
        <>
            <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                <GridItem colSpan={6}>
                    <Flex
                        h="full"
                        flexDirection={"column"}
                        justifyContent={"center"}
                    >
                        <Heading fontSize="7xl">Movie Manager</Heading>
                        <Text textAlign={"start"} fontSize={"xl"}>
                            Track and organize your movies
                        </Text>
                        <Button
                            as={Link}
                            to={"/browse"}
                            mt="5"
                            colorScheme="purple"
                            alignSelf={"start"}
                            fontSize={"lg"}
                            fontWeight={"semibold"}
                            padding={"6"}
                        >
                            Get Started
                        </Button>
                    </Flex>
                </GridItem>
                <GridItem colSpan={6}>
                    <VStack h="full" alignItems="start" gap={10} mt={"8"}>
                        <Flex gap={10}>
                            <Box
                                w="400px"
                                h="280px"
                                bg="tomato"
                                borderRadius={10}
                                shadow={"2xl"}
                                className={"img-place"}
                                style={{ "--order": 1 } as CSSProperties}
                            ></Box>
                            <Box
                                w="400px"
                                h="280px"
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
                                w="400px"
                                h="280px"
                                bg="tomato"
                                borderRadius={10}
                                shadow={"2xl"}
                                className={"img-place"}
                                style={{ "--order": 3 } as CSSProperties}
                            ></Box>
                            <Box
                                w="400px"
                                h="280px"
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
