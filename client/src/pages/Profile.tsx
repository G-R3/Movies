import { DeleteIcon } from "@chakra-ui/icons";
import {
    Button,
    Heading,
    IconButton,
    Text,
    SimpleGrid,
    HStack,
    Tooltip,
    useToast,
    Flex,
    useColorModeValue,
    LinkBox,
    LinkOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

interface List {
    _id: string;
    title: string;
    description: string;
}

export default function Profile() {
    const [lists, setLists] = useState<List[]>([]);
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const bg = useColorModeValue("gray.50", "#2D3748");
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
            setIsLoading(false);
        } catch (err) {
            setError("Failed to fetch lists");
            setIsLoading(false);
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

    return (
        <>
            <Heading
                as="h1"
                fontSize={"7xl"}
                marginY={"28"}
                className="profile-header"
            >
                Profile
            </Heading>

            <Heading as={"h2"} mb={5}>
                Your lists
            </Heading>
            {lists.length > 0 ? (
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacing={"40px"}
                >
                    {lists.map((list) => (
                        <LinkBox
                            as="article"
                            key={list._id}
                            w={"100%"}
                            h="210px"
                            borderRadius={10}
                            shadow={"md"}
                            padding={"5"}
                            bg={bg}
                            _hover={{
                                shadow: "lg",
                            }}
                            transition="box-shadow 200ms ease"
                        >
                            <HStack justifyContent={"space-between"}>
                                <Heading
                                    as={"h3"}
                                    fontSize="2xl"
                                    fontWeight={"semibold"}
                                >
                                    <LinkOverlay
                                        as={Link}
                                        to={`/profile/${list._id}`}
                                        noOfLines={1}
                                    >
                                        {list.title}
                                    </LinkOverlay>
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
                            <Text mt={3} color={"gray.400"} noOfLines={3}>
                                {list.description}
                            </Text>
                        </LinkBox>
                    ))}
                </SimpleGrid>
            ) : isLoading ? (
                <Loader size="xl" />
            ) : error ? (
                <Heading
                    as="h3"
                    textAlign={"center"}
                    color={"gray.600"}
                    fontSize="2xl"
                >
                    {error}
                </Heading>
            ) : lists.length === 0 ? (
                <Flex alignItems={"center"} flexDirection="column">
                    <Heading
                        as="h3"
                        textAlign={"center"}
                        color={"gray.600"}
                        fontSize="2xl"
                    >
                        Looks like you haven't created any lists
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
            ) : (
                <></>
            )}
        </>
    );
}
