import {
    Heading,
    Text,
    SimpleGrid,
    Box,
    VStack,
    Button,
    useToast,
    Flex,
    IconButton,
    useDisclosure,
} from "@chakra-ui/react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { EditIcon } from "@chakra-ui/icons";
import ListModal from "../components/ListModal";

interface IList {
    _id: string;
    title: string;
    description: string;
    movies: [];
    createdAt: string;
}

export default function ListPage() {
    const { listId } = useParams();
    const [list, setList] = useState<IList>({} as IList);
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const getListById = async () => {
            try {
                const response = await fetch(`/api/list/${listId}`);

                if (response.status === 404) {
                    navigate("/404", { replace: true });
                }

                const data = await response.json();

                if (!data.success) {
                    navigate("/404", { replace: true });
                }

                setList(data.list);
                setIsLoading(false);
            } catch (err) {
                console.warn(err);
            }
        };

        getListById();
    }, []);

    const handleClick = async (e: any, listId: string, movieId: string) => {
        e.currentTarget.disabled = true;
        try {
            setIsLoading(true);
            const response = await fetch(
                `/api/delete/${listId}/movie/${movieId}`,
                {
                    method: "DELETE",
                }
            );

            if (response.status === 404) {
                throw new Error("Failed to remove movie");
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message);
            }

            setList(data.list);
            toast({
                title: "Movie removed",
                description: data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } catch (err: any) {
            toast({
                title: "Movie Added",
                description: err.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && Object.keys(list).length === 0)
        return (
            <Box mt={20}>
                <Loader size="xl" />
            </Box>
        );

    return (
        <>
            <Flex justifyContent={"space-between"} marginY={"28"}>
                <Box>
                    <Heading
                        fontSize={{ base: "4xl", lg: "7xl" }}
                        className="profile-header"
                        noOfLines={1}
                    >
                        {list && list.title}
                    </Heading>
                    <Text
                        fontSize={{ base: "md", lg: "xl" }}
                        color={"gray.400"}
                        mt={2}
                    >
                        {list && list.description}
                    </Text>
                </Box>
                <IconButton
                    aria-label="Edit list"
                    icon={<EditIcon />}
                    onClick={onOpen}
                />
            </Flex>

            {list?.movies?.length ? (
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacing={"40px"}
                >
                    {list.movies.map((movie: any) => (
                        <VStack key={movie.id}>
                            <Card movie={movie} />
                            <Button
                                width={"full"}
                                variant="outline"
                                colorScheme={"red"}
                                onClick={(e) =>
                                    handleClick(e, list._id, movie._id)
                                }
                            >
                                Remove from list
                            </Button>
                        </VStack>
                    ))}
                </SimpleGrid>
            ) : (
                <></>
            )}

            {!isLoading && list.movies.length === 0 && (
                <Flex alignItems={"center"} flexDirection="column">
                    <Heading
                        as="h3"
                        textAlign={"center"}
                        color={"gray.600"}
                        fontSize="2xl"
                    >
                        Looks like you haven't added any movies to this list
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
                        Browse Movies
                    </Button>
                </Flex>
            )}

            <ListModal
                isOpen={isOpen}
                onClose={onClose}
                list={list}
                setList={setList}
            />
        </>
    );
}
