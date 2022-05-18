import { Grid, GridItem, Heading, Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

interface List {
    _id: string;
    title: string;
    description: string;
}

export default function Profile() {
    const [lists, setLists] = useState<List[]>([]);
    const [error, setError] = useState<string>();
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        const getLists = async () => {
            try {
                const response = await fetch("/api/lists");
                const data = await response.json();

                if (!data.success) {
                    throw new Error(data.message);
                }

                setLists(data.lists);
            } catch (err) {
                setError("Failed to fetch lists");
            }
        };
        getLists();
    }, []);

    if (!isLoggedIn) return <Navigate to="/" replace />;

    return (
        <Grid templateColumns={"repeat(12,1fr)"}>
            <GridItem colSpan={6}>
                <Heading
                    fontSize={"7xl"}
                    marginY={"28"}
                    className="profile-header"
                >
                    Profile
                </Heading>
            </GridItem>
            <GridItem rowStart={2} colSpan={12}>
                <Heading as={"h2"} mb={5}>
                    Your lists
                </Heading>
                {lists.length > 0 ? (
                    <Flex wrap="wrap" gap={5}>
                        {lists.map((list) => (
                            <Box
                                key={list["_id"]}
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
                                    {list.title}
                                </Heading>
                                <Text mt={3} color={"gray.400"}>
                                    {list.description}
                                </Text>
                            </Box>
                        ))}
                    </Flex>
                ) : (
                    <Heading
                        as="h3"
                        textAlign={"center"}
                        color={"gray.600"}
                        fontSize="2xl"
                    >
                        {error}
                    </Heading>
                )}
            </GridItem>
        </Grid>
    );
}
