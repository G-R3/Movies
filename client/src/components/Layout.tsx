import { Outlet } from "react-router-dom";
import {
    Box,
    Container,
    Link,
    useColorModeValue,
    useMediaQuery,
    Flex,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { Link as RouterLink } from "react-router-dom";
import MobileNav from "./MobileNav";

const Layout = (): JSX.Element => {
    const color = useColorModeValue("gray.800", "gray.300");
    const [isMobile] = useMediaQuery("(max-width: 48em)");

    return (
        <Box color={color} paddingX={[5, 10, 20]} paddingBottom={10}>
            <Container maxW="container.xl" p={0}>
                <Flex
                    as="header"
                    alignItems={"center"}
                    justifyContent="space-between"
                    py="3.5"
                >
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
                    {isMobile ? <MobileNav /> : <Navbar />}
                </Flex>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout;
