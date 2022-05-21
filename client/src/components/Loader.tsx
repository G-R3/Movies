import { Flex, Spinner } from "@chakra-ui/react";

interface Props {
    size: string;
}

export default function Loader({ size }: Props): JSX.Element {
    return (
        <Flex justifyContent={"center"}>
            <Spinner size={size} />
        </Flex>
    );
}
