import { Button, Flex, Heading, Text, chakra } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Flex direction={"column"} alignItems="center">
            <Heading as={"h1"}>404</Heading>
            <Text>
                Oops Something went{" "}
                <chakra.span fontWeight={"bold"}>WRONG</chakra.span>
            </Text>
            <Text>Page Not Found</Text>
            <Button
                as={Link}
                to="/"
                mt="5"
                colorScheme="purple"
                fontSize={"md"}
                fontWeight={"semibold"}
                padding={4}
            >
                Back to Home
            </Button>
        </Flex>
    );
}
