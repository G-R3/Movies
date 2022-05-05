import { Link as RouterLink } from "react-router-dom";
import {
    Link,
    Flex,
    Spacer,
    Stack,
    IconButton,
    useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = (): JSX.Element => {
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
            <Stack direction="row">
                <Link
                    as={RouterLink}
                    to="/browse"
                    _hover={{ textDecoration: "none" }}
                >
                    Browse
                </Link>
            </Stack>
            <IconButton
                aria-label="Toggle Theme"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
            />
        </Flex>
    );
};

export default Navbar;
