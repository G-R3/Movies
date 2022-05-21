import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Link,
    Flex,
    Spacer,
    HStack,
    IconButton,
    useColorMode,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import AuthForm from "./AuthForm";
import { AuthContext } from "../context/Auth";

const Navbar = (): JSX.Element => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const { isLoggedIn, getIsLoggedIn } = useContext(AuthContext);

    const logOut = async () => {
        try {
            await fetch("/auth/logout");
            await getIsLoggedIn?.();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Flex
            as="nav"
            direction="row"
            align="center"
            justify="center"
            py="3.5"
            gap={5}
        >
            <Link
                to="/"
                as={RouterLink}
                fontSize="3xl"
                fontWeight="bold"
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
            >
                Movie
            </Link>
            <Spacer />
            <HStack gap={2}>
                <Flex align={"center"} gap={5}>
                    <Link
                        as={RouterLink}
                        to="/browse"
                        _hover={{ textDecoration: "none" }}
                    >
                        Browse
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <Link
                                as={RouterLink}
                                to="/profile"
                                _hover={{ textDecoration: "none" }}
                            >
                                Profile
                            </Link>
                            <Button onClick={logOut}>Logout</Button>
                        </>
                    ) : (
                        <Button
                            colorScheme="purple"
                            variant={"solid"}
                            outline="none"
                            _hover={{ textDecoration: "none" }}
                            onClick={() => {
                                onOpen();
                            }}
                        >
                            Sign Up
                        </Button>
                    )}
                </Flex>
                <IconButton
                    aria-label="Toggle Theme"
                    icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                />
            </HStack>

            <AuthForm isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};

export default Navbar;
