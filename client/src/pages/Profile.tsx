import { useState } from "react";
import { Grid, GridItem, Heading, Box, Flex, Text } from "@chakra-ui/react";

export default function Profile() {
    const [lists, setLists] = useState();

    return (
        <Grid templateColumns={"repeat(12,1fr)"}>
            <GridItem colSpan={6}>
                <Heading
                    fontSize={"7xl"}
                    marginY={"28"}
                    className="profile-header"
                >
                    Hello, Gerardo
                </Heading>
            </GridItem>
            <GridItem rowStart={2} colSpan={12}>
                <Heading as={"h2"} mb={5}>
                    Your lists
                </Heading>
                <Flex justifyContent={"space-between"}>
                    <Box
                        w={"365px"}
                        h="210px"
                        borderRadius={10}
                        shadow={"2xl"}
                        padding={"5"}
                        style={{
                            backgroundColor: "#2D3748",
                        }}
                    >
                        <Heading
                            as={"h3"}
                            fontSize="2xl"
                            fontWeight={"semibold"}
                        >
                            Watchlist
                        </Heading>
                        <Text mt={3} color={"gray.400"}>
                            Movies that you just must watch
                        </Text>
                    </Box>
                    <Box
                        w={"365px"}
                        h="210px"
                        borderRadius={10}
                        shadow={"2xl"}
                        padding={"5"}
                        style={{
                            backgroundColor: "#2D3748",
                        }}
                    >
                        <Heading
                            as={"h3"}
                            fontSize="2xl"
                            fontWeight={"semibold"}
                        >
                            My List
                        </Heading>
                        <Text mt={3} color={"gray.400"}>
                            This is my first list. These are movies that I want
                            to watch at some point
                        </Text>
                    </Box>
                    <Box
                        w={"365px"}
                        h="210px"
                        borderRadius={10}
                        shadow={"2xl"}
                        padding={"5"}
                        style={{
                            backgroundColor: "#2D3748",
                        }}
                    >
                        <Heading
                            as={"h3"}
                            fontSize="2xl"
                            fontWeight={"semibold"}
                        >
                            Anime Movies
                        </Heading>
                        <Text mt={3} color={"gray.400"}>
                            IM NOT A WEEB... I PROMISE PLZ THESE ARE JUST
                            ANIMATION MOVIES 🎬
                        </Text>
                    </Box>
                </Flex>
            </GridItem>
        </Grid>
    );
}
