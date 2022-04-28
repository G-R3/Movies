import { Outlet } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "./Navbar";

const Layout = (): JSX.Element => {
    return (
        <Box backgroundColor="blackAlpha.900" color="gray.300" h="full">
            <Container maxW="container.xl">
                <header>
                    <Navbar />
                </header>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Layout;
