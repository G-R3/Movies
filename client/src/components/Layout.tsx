import { Outlet } from "react-router-dom";
import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./Navbar";

const Layout = (): JSX.Element => {
    const color = useColorModeValue("gray.800", "gray.300");
    return (
        <Box color={color} paddingX={[5, 10, 20]} paddingBottom={10}>
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
