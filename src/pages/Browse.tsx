import { useEffect, useState } from "react";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import Card from "../components/Card";

import { getMovies } from "../api/index";

const Browse = (): JSX.Element => {
    const [movies, setMovies] = useState<any[] | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getMovies();
            setMovies(data.results);
        };

        fetchData();
    }, []);
    if (!movies) return <p>Loading...</p>;
    return (
        <>
            <Heading fontSize="5xl" mt={10} mb={8}>
                Browse
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={10}>
                {movies.map((movie) => (
                    <Card key={movie.id} movie={movie} />
                ))}
            </SimpleGrid>
        </>
    );
};

export default Browse;
