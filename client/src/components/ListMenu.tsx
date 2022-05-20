import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useDisclosure,
    useToast,
    useColorModeValue,
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

    const bgAlt = useColorModeValue(
        "RGBA(0, 0, 0, 0.16)",
        "RGBA(255, 255, 255, 0.16)"
    );

    const getLists = async () => {
        console.log("Hello");
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

    useEffect(() => {
        getLists();
    }, []);

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
                throw new Error("Failed to add movie to the list");
            }

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }

            toast({
                title: "Movie Added",
                description: data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } catch (err: any) {
            toast({
                title: "Failed to add movie",
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
            <Menu placement="bottom-end" isLazy closeOnSelect={false}>
                <MenuButton as={Button} marginTop="2">
                    Add to list
                </MenuButton>
                <MenuList
                    height="auto"
                    maxHeight="300px"
                    overflowY="scroll"
                    css={{
                        "&::-webkit-scrollbar": {
                            width: "4px",
                        },
                        "&::-webkit-scrollbar-track": {
                            width: "6px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: bgAlt,
                            borderRadius: "24px",
                        },
                    }}
                >
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

            <ListModal isOpen={isOpen} onClose={onClose} getLists={getLists} />
        </>
    );
}
