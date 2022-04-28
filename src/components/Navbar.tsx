import { Link as RouteLink } from "react-router-dom";
import { Link, Flex, Spacer, Stack, Text } from "@chakra-ui/react";

const Navbar = (): JSX.Element => {
    return (
        <Flex as="nav" direction="row" align="center" justify="center" py="3.5">
            <Text as="h2" fontSize="2xl">
                Movie
            </Text>
            <Spacer />
            <Stack direction="row">
                <Link as={RouteLink} to="/browse">
                    Browse
                </Link>
            </Stack>
        </Flex>
    );
};

export default Navbar;
