import {
    Heading,
    Text,
    SimpleGrid,
    Box,
    VStack,
    Button,
    useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card";

interface IList {
    _id: string;
    title: string;
    description: string;
    movies: [];
    createdAt: string;
}

export default function ListPage() {
    const { listId } = useParams();
    const [list, setList] = useState<IList>();
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await fetch(`/api/list/${listId}/movies`);

                if (response.status === 404) {
                    navigate("/404", { replace: true });
                }

                const data = await response.json();

                if (!data.success) {
                    navigate("/404", { replace: true });
                }

                setList(data.list);
            } catch (err) {
                console.warn(err);
            }
        };

        getMovies();
    }, []);

    const handleClick = async (listId: string, movieId: string) => {
        try {
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
        }
    };

    return (
        <>
            <Box marginY={"28"}>
                <Heading fontSize={"7xl"} className="profile-header">
                    {list && list.title}
                </Heading>
                <Text fontSize={"xl"} color={"gray.400"}>
                    {list && list.description}
                </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={"40px"}>
                {list &&
                    list.movies.map((movie: any) => (
                        <VStack key={movie.id}>
                            <Card movie={movie} />
                            <Button
                                width={"full"}
                                variant="outline"
                                colorScheme={"red"}
                                onClick={() => handleClick(list._id, movie._id)}
                            >
                                Remove from list
                            </Button>
                        </VStack>
                    ))}
            </SimpleGrid>
        </>
    );
}
