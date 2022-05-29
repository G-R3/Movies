import {
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useDisclosure,
    useToast,
    useColorModeValue,
    chakra,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import ListModal from "./ListModal";
import AuthForm from "./AuthForm";
import { ListContext, ListDispatchContext } from "../context/ListContext";

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
    const { isLoggedIn } = useContext(AuthContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { lists } = useContext(ListContext);

    const toast = useToast();

    const bgAlt = useColorModeValue(
        "RGBA(0, 0, 0, 0.16)",
        "RGBA(255, 255, 255, 0.16)"
    );

    const handleClick = async (listId: string) => {
        try {
            const response = await fetch(`/api/add/${listId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ movie }),
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

    if (!isLoggedIn) {
        return (
            <>
                <Button marginTop="2" onClick={() => onOpen()} variant="ghost">
                    Add to list
                </Button>
                <AuthForm isOpen={isOpen} onClose={onClose} />
            </>
        );
    }

    return (
        <>
            <Menu placement="bottom-end" isLazy closeOnSelect={false}>
                <MenuButton as={Button} marginTop="2" variant="ghost">
                    Add to list
                </MenuButton>
                <MenuList
                    height="auto"
                    maxHeight="300px"
                    width="300px"
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
                        lists.map((list: List) => (
                            <MenuItem
                                key={list._id}
                                onClick={() => handleClick(list._id)}
                            >
                                <chakra.span noOfLines={1}>
                                    {list.title}
                                </chakra.span>
                            </MenuItem>
                        ))}
                </MenuList>
            </Menu>

            <ListModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}
