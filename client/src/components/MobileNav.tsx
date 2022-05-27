import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Flex,
    Link,
    useColorMode,
    IconButton,
    VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ListDispatchContext } from "../context/ListContext";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import AuthForm from "./AuthForm";

export default function MobileNav() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isFormOpen,
        onOpen: onFormOpen,
        onClose: onFormClose,
    } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const { isLoggedIn, getIsLoggedIn } = useContext(AuthContext);
    const dispatch = useContext(ListDispatchContext);

    const logOut = async () => {
        try {
            await fetch("/auth/logout");
            await getIsLoggedIn();
            dispatch({ action: "CLEAR_LIST" });
        } catch (err) {
            console.error(err);
        }
    };
    const btnRef = useRef<HTMLButtonElement | null>(null);

    return (
        <Flex as="nav">
            <IconButton
                aria-label="Open navigation"
                icon={<HamburgerIcon />}
                ref={btnRef}
                onClick={onOpen}
            ></IconButton>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                size="xs"
                preserveScrollBarGap
                returnFocusOnClose
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Link
                            to="/"
                            as={RouterLink}
                            fontSize="3xl"
                            fontWeight="bold"
                            textDecoration="none"
                            _hover={{ textDecoration: "none" }}
                            style={{
                                boxShadow: "none",
                            }}
                        >
                            Movie
                        </Link>
                    </DrawerHeader>

                    <DrawerBody>
                        <VStack gap={2} w="full">
                            <Flex
                                align={"center"}
                                flexDirection="column"
                                gap="2"
                                w={"full"}
                            >
                                <Link
                                    as={RouterLink}
                                    to="/browse"
                                    _hover={{ textDecoration: "none" }}
                                    w={"full"}
                                    textAlign="center"
                                    paddingY="2"
                                    onClick={onClose}
                                >
                                    Browse
                                </Link>
                                {/* for now this will do. I need to find a better solution */}
                                {isLoggedIn === true ? (
                                    <>
                                        <Link
                                            as={RouterLink}
                                            to="/profile"
                                            _hover={{ textDecoration: "none" }}
                                            w={"full"}
                                            textAlign="center"
                                            paddingY="2"
                                            onClick={onClose}
                                        >
                                            Profile
                                        </Link>
                                        <Button
                                            w={"full"}
                                            textAlign="center"
                                            onClick={() => {
                                                logOut();
                                                onClose();
                                            }}
                                            paddingY="2"
                                        >
                                            Logout
                                        </Button>
                                    </>
                                ) : isLoggedIn === false ? (
                                    <Button
                                        w={"full"}
                                        paddingY="2"
                                        colorScheme="purple"
                                        variant={"solid"}
                                        outline="none"
                                        _hover={{ textDecoration: "none" }}
                                        onClick={() => {
                                            onFormOpen();
                                            onClose();
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                ) : (
                                    <></>
                                )}
                            </Flex>
                            <IconButton
                                aria-label="Toggle Theme"
                                icon={
                                    colorMode === "light" ? (
                                        <MoonIcon />
                                    ) : (
                                        <SunIcon />
                                    )
                                }
                                onClick={toggleColorMode}
                            />
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <AuthForm isOpen={isFormOpen} onClose={onFormClose} />
        </Flex>
    );
}
