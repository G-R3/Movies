import { Heading, Text, SimpleGrid, Box } from "@chakra-ui/react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/Auth";
import Card from "../components/Card";

interface IList {
    title: string;
    description: string;
    movies: [];
    createdAt: string;
}

export default function ListPage() {
    const { listId } = useParams();
    const [list, setList] = useState<IList>();
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

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

    if (!isLoggedIn) return <Navigate to="/" replace />;

    return (
        <>
            <Box marginY={"28"}>
                <Heading fontSize={"7xl"} className="profile-header">
                    Watchlist
                </Heading>
                <Text fontSize={"xl"} color={"gray.400"}>
                    For movies that you just most watch
                </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={"40px"}>
                {list &&
                    list.movies.map((movie: any) => (
                        <Card key={movie.id} movie={movie} />
                    ))}
            </SimpleGrid>
        </>
    );
}
