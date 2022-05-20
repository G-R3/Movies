import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ListModal from "./ListModal";
import { useEffect, useState } from "react";

interface List {
    _id: string;
    title: string;
    description: string;
}
interface Genres {
    id: number;
    name: string;
}

interface MovieDetails {
    backdrop_path: string;
    budget: number;
    genres: Genres[];
    id: number;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    runtime: number;
    title: string;
    tagline: string;
    vote_average: number;
    vote_count: number;
}
interface Movie {
    movie: MovieDetails;
}

export default function ListMenu({ movie }: Movie): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [lists, setLists] = useState<List[]>([]);
    const toast = useToast();

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
                console.error("Failed to fetch lists");
            }
        };
        getLists();
    }, [lists]);

    const handleClick = async (id: string) => {
        try {
            const response = await fetch("/api/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, movie }),
            });

            if (response.status === 404) {
                throw new Error("Failed to add movie. Try again later.");
            }

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }

            toast({
                title: "Movie Added",
                description: data.message,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (err: any) {
            toast({
                title: "Failed to add movie",
                description: err.message,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Menu placement="bottom-end" isLazy closeOnSelect={false}>
                <MenuButton as={Button} marginTop="2">
                    Add to list
                </MenuButton>
                <MenuList>
                    <MenuItem icon={<AddIcon />} onClick={onOpen}>
                        Create new list
                    </MenuItem>
                    {lists.length > 0 &&
                        lists.map((list) => (
                            <MenuItem
                                key={list._id}
                                onClick={() => handleClick(list._id)}
                            >
                                {list.title}
                            </MenuItem>
                        ))}
                </MenuList>
            </Menu>
            <ListModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}
