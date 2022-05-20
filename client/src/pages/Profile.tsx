import { DeleteIcon } from "@chakra-ui/icons";
import {
    Button,
    Grid,
    GridItem,
    Heading,
    Box,
    IconButton,
    Text,
    SimpleGrid,
    HStack,
    Tooltip,
    useToast,
    Flex,
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { Navigate, Link } from "react-router-dom";
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
    const toast = useToast();

    const getLists = async () => {
        try {
            const response = await fetch("/api/lists");

            if (response.status === 404) {
                throw new Error();
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message);
            }

            setLists(data.lists);
            setError("");
        } catch (err) {
            setError("Failed to fetch lists");
        }
    };

    useEffect(() => {
        getLists();
    }, []);

    const deleteList = async (listId: string) => {
        try {
            const response = await fetch(`/api/delete/${listId}`, {
                method: "DELETE",
            });

            if (response.status === 404) {
                throw new Error();
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message);
            }

            getLists();
            setError("");
            toast({
                title: "List deleted",
                description: data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } catch (err: any) {
            let message = err?.message || "something happened";
            setError(message);
            toast({
                title: "Oh No",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

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
                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }}
                        spacing={"40px"}
                    >
                        {lists.map((list) => (
                            <Box
                                key={list._id}
                                w={"100%"}
                                h="210px"
                                borderRadius={10}
                                shadow={"2xl"}
                                padding={"5"}
                                style={{
                                    backgroundColor: "#2D3748",
                                }}
                            >
                                <HStack justifyContent={"space-between"}>
                                    <Heading
                                        as={"h3"}
                                        fontSize="2xl"
                                        fontWeight={"semibold"}
                                    >
                                        {list.title}
                                    </Heading>
                                    <Tooltip
                                        label="Delete list"
                                        aria-label="Delete list"
                                    >
                                        <IconButton
                                            aria-label="Delete movie list"
                                            icon={<DeleteIcon />}
                                            variant={"outline"}
                                            colorScheme="red"
                                            onClick={() => deleteList(list._id)}
                                        />
                                    </Tooltip>
                                </HStack>
                                <Text mt={3} color={"gray.400"}>
                                    {list.description}
                                </Text>
                            </Box>
                        ))}
                    </SimpleGrid>
                ) : error ? (
                    <Heading
                        as="h3"
                        textAlign={"center"}
                        color={"gray.600"}
                        fontSize="2xl"
                    >
                        {error}
                    </Heading>
                ) : (
                    <Flex justifyContent={"center"} flexDirection="column">
                        <Heading
                            as="h3"
                            textAlign={"center"}
                            color={"gray.600"}
                            fontSize="2xl"
                        >
                            Not lists where found
                        </Heading>
                        <Button
                            as={Link}
                            to={"/browse"}
                            mt="5"
                            colorScheme="purple"
                            fontSize={"lg"}
                            fontWeight={"semibold"}
                            padding={"6"}
                        >
                            Browse
                        </Button>
                    </Flex>
                )}
            </GridItem>
        </Grid>
    );
}
