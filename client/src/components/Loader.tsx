import { Center, Spinner } from "@chakra-ui/react";

interface Props {
    size: string;
}

export default function Loader({ size }: Props): JSX.Element {
    return (
        <Center justifyContent={"center"}>
            <Spinner size={size} />
        </Center>
    );
}
