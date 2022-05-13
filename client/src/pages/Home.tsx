import { Button, Flex, Heading, Text } from "@chakra-ui/react";

const Home = (): JSX.Element => {
    return (
        <Flex
            as="main"
            direction="column"
            alignItems="center"
            justify="center"
            h="300px"
        >
            <Heading fontSize="4xl">Movie Manager</Heading>
            <Text>Track and organize your movies</Text>
            <Button mt="5" colorScheme="purple">
                Get Started
            </Button>
        </Flex>
    );
};

export default Home;
