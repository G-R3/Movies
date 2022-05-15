import {
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Button,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ErrorData = {
    email?: string;
    password?: string;
};
type FormData = {
    email: string;
    password: string;
};

const validate = (values) => {
    let errors: ErrorData = {};

    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    }

    return errors;
};

const RegisterModal = ({ isOpen, onClose }): JSX.Element => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<ErrorData>({});

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate(formData);

        if (Object.keys(validationErrors).length !== 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            console.log(data);
            if (data.status === 400) {
                console.log("Form field errors");
                console.log(data);
                return;
            }

            setErrors({});
            setFormData({
                email: "",
                password: "",
            });
            onClose();

            navigate("/browse");
        } catch (err) {
            console.log("ERROR SUBMITTING");
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const { email, password } = formData;

    return (
        <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
            <ModalOverlay />
            <ModalContent marginX={2}>
                <ModalHeader textAlign={"center"}>Sign up</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form id="register-form" onSubmit={(e) => handleSubmit(e)}>
                        <FormControl
                            isInvalid={Object.keys(errors).length !== 0}
                            display={"flex"}
                            flexDirection="column"
                            gap={5}
                        >
                            <Box>
                                <FormLabel htmlFor="email">
                                    Email address
                                </FormLabel>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="example@email.com"
                                    value={email}
                                    onChange={(e) => handleChange(e)}
                                />
                                {errors?.email && (
                                    <FormErrorMessage>
                                        {errors?.email}
                                    </FormErrorMessage>
                                )}
                            </Box>

                            <Box>
                                <FormLabel htmlFor="password">
                                    Password
                                </FormLabel>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => handleChange(e)}
                                />

                                {errors?.password && (
                                    <FormErrorMessage>
                                        {errors?.password}
                                    </FormErrorMessage>
                                )}
                            </Box>
                        </FormControl>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button
                        type="submit"
                        mr={3}
                        colorScheme="blue"
                        form="register-form"
                    >
                        Submit
                    </Button>
                    <Button variant={"ghost"} mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RegisterModal;
