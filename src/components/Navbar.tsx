import { Link as RouteLink } from "react-router-dom";
import {
    Link,
    Flex,
    Spacer,
    Stack,
    Text,
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
            <Text as="h2" fontSize="2xl" fontWeight="bold">
                Movie
            </Text>
            <Spacer />
            <Stack direction="row">
                <Link as={RouteLink} to="/browse">
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
