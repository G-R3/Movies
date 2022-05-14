import { Outlet } from "react-router-dom";
import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./Navbar";

const Layout = (): JSX.Element => {
    const bg = useColorModeValue("gray.100", "gray.900");
    const color = useColorModeValue("gray.800", "gray.300");
    return (
        <Box backgroundColor={bg} color={color} h="full" paddingX={[2, 10, 20]}>
            <Container maxW="container.xl" p={0}>
                <header>
                    <Navbar />
                </header>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout;
