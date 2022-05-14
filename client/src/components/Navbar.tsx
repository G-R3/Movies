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
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

const Navbar = (): JSX.Element => {
    const {
        isOpen: isRegisterModalOpen,
        onOpen: onRegisterModalOpen,
        onClose: onRegisterModalClose,
    } = useDisclosure();
    const {
        isOpen: isLoginModalOpen,
        onOpen: onLoginModalOpen,
        onClose: onLoginModalClose,
    } = useDisclosure();

    const { colorMode, toggleColorMode } = useColorMode();

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
            <HStack gap={5}>
                <Flex align={"center"} gap={5}>
                    <Link
                        as={RouterLink}
                        to="/browse"
                        _hover={{ textDecoration: "none" }}
                    >
                        Browse
                    </Link>
                    <Link
                        onClick={onLoginModalOpen}
                        _hover={{ textDecoration: "none" }}
                    >
                        Login
                    </Link>
                    <Button
                        onClick={onRegisterModalOpen}
                        colorScheme="purple"
                        variant={"solid"}
                        outline="none"
                        _hover={{ textDecoration: "none" }}
                    >
                        Sign Up
                    </Button>
                </Flex>
                <IconButton
                    aria-label="Toggle Theme"
                    icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                    onClick={toggleColorMode}
                />
            </HStack>

            <LoginModal isOpen={isLoginModalOpen} onClose={onLoginModalClose} />
            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={onRegisterModalClose}
            />
        </Flex>
    );
};

export default Navbar;
