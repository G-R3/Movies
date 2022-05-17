import { FormEvent, ChangeEvent, useState } from "react";
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
} from "@chakra-ui/react";

interface Props {
    isOpen: boolean;
    onClose(): void;
}

// prettier-ignore
type IOnChange = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

interface Errors {
    title?: string;
    description?: string;
}

interface FormData {
    title: string;
    description: string;
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

export default function CreateList({ isOpen, onClose }: Props): JSX.Element {
    const [listData, setListData] = useState({ title: "", description: "" });
    const [errors, setErrors] = useState<Errors>({});
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
        const hasErrors = validate(listData);

        if (Object.keys(hasErrors).length !== 0) {
            setErrors({ ...hasErrors });
            return;
        }
        console.log(e.currentTarget);

        let formData = new FormData(e.currentTarget);
        const response = await fetch("/api/create", {
            method: "POST",
            body: formData,
        });
        const data = response.json();

        console.log(data);

        setErrors({});
    };

    const { title, description } = listData;
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a list</ModalHeader>
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
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            type="submit"
                            form={"create-form"}
                        >
                            Create
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
