import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Textarea,
    FormErrorMessage,
    Flex,
    useToast,
    Text,
} from "@chakra-ui/react";
import {
    FormEvent,
    ChangeEvent,
    useState,
    useContext,
    Dispatch,
    SetStateAction,
} from "react";
import { ListDispatchContext } from "../context/ListContext";

// prettier-ignore
type IOnChange = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

interface Errors {
    title?: string;
    description?: string;
    message?: string;
}

interface FormData {
    title: string;
    description: string;
}

interface List {
    _id: string;
    title: string;
    description: string;
    movies: [];
    createdAt: string;
}

interface Props {
    isOpen: boolean;
    onClose(): void;
    list?: List;
    setList?: Dispatch<SetStateAction<List>>;
}

const validate = (values: FormData) => {
    let errors: Errors = {};

    if (!values.title) {
        errors.title = "Title is required";
    }

    if (values.description.length > 200) {
        errors.description = "Max length exceeded";
    }

    return errors;
};

export default function ListModal({
    isOpen,
    onClose,
    list,
    setList,
}: Props): JSX.Element {
    const [listData, setListData] = useState({
        title: list?.title || "",
        description: list?.description || "",
    });
    const [errors, setErrors] = useState<Errors>({});
    const [isSubmitting, setisSubmitting] = useState<boolean>(false);
    const dispatch = useContext(ListDispatchContext);
    const toast = useToast();

    const handleChange = (e: IOnChange): void => {
        setListData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        setisSubmitting(true);
        const hasErrors = validate(listData);

        if (Object.keys(hasErrors).length !== 0) {
            setErrors(hasErrors);
            setisSubmitting(false);
            return;
        }

        try {
            const url = list ? `/api/edit/${list._id}` : "/api/create";
            const options = {
                method: list ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(listData),
            };

            const response = await fetch(url, options);

            if (response.status === 404) {
                throw new Error();
            }

            const data = await response.json();

            if (list) {
                dispatch({ type: "EDIT_LIST", payload: data.list });
                setList?.({
                    ...list,
                    title: data.list.title,
                    description: data.list.description,
                });
                toast({
                    title: "List updated",
                    description: data.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            } else {
                dispatch({ type: "ADD_LIST", payload: data.list });
                toast({
                    title: "List created",
                    description: data.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                setListData({
                    title: "",
                    description: "",
                });
            }

            setisSubmitting(false);
            setErrors({});
            onClose();
        } catch (err) {
            const message = list
                ? "Failed to edit list try again later"
                : "Failed to create list try again later.";
            setisSubmitting(false);
            setErrors({ message });
        }
    };

    const { title, description } = listData;
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
                <ModalOverlay />
                <ModalContent marginX={2}>
                    <ModalHeader>
                        {list ? "Edit list" : "Create list"}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form
                            id="create-form"
                            onSubmit={(e) => {
                                handleSubmit(e);
                            }}
                        >
                            <FormControl
                                isInvalid={errors.hasOwnProperty("title")}
                            >
                                <FormLabel htmlFor="email">Title</FormLabel>
                                <Input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => handleChange(e)}
                                />
                                <FormErrorMessage>
                                    {errors.title}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={errors.hasOwnProperty("description")}
                            >
                                <FormLabel htmlFor="password">
                                    Description
                                </FormLabel>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={description}
                                    size="lg"
                                    resize={"none"}
                                    onChange={(e) => handleChange(e)}
                                />

                                <Flex>
                                    <FormErrorMessage lineHeight="normal">
                                        {errors.description}
                                    </FormErrorMessage>
                                    <FormHelperText
                                        w="fit-content"
                                        ml={"auto"}
                                        color={
                                            listData.description.length > 200
                                                ? "red.400"
                                                : "gray.400"
                                        }
                                    >
                                        {description.length} / 200
                                    </FormHelperText>
                                </Flex>
                            </FormControl>
                        </form>
                        {errors.message && (
                            <Text
                                mt={5}
                                color={"red.300"}
                                fontWeight={"bold"}
                                textAlign="center"
                            >
                                {errors.message}
                            </Text>
                        )}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            type="submit"
                            form={"create-form"}
                            isLoading={isSubmitting}
                        >
                            {list ? "Edit" : "Create"}
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
