import {
    Text,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    HStack,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type ErrorData = {
    email?: string;
    password?: string;
};
type FormData = {
    email: string;
    password: string;
};

const validate = (values: FormData): ErrorData => {
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

type Props = {
    showSignUpForm: boolean;
    setShowSignUpForm: any;
    isOpen: boolean;
    onClose: any;
};

const AuthForm = ({
    showSignUpForm,
    setShowSignUpForm,
    isOpen,
    onClose,
}: Props): JSX.Element => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<ErrorData>({});

    const navigate = useNavigate();

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        const validationErrors = validate(formData);

        if (Object.keys(validationErrors).length !== 0) {
            setErrors(validationErrors);
            return;
        }

        let url;
        if (showSignUpForm) {
            url = "/api/register";
        } else {
            url = "/api/login";
        }

        try {
            const response = await fetch(url, {
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

            if (data.status === 400) {
                console.log("Form field errors");
                console.log(data);
                return;
            }
            console.log(data);

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

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const { email, password } = formData;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"lg"}
            preserveScrollBarGap
        >
            <ModalOverlay />
            <ModalContent marginX={2}>
                <ModalHeader textAlign={"center"}>
                    {showSignUpForm ? "Sign Up" : "Login"}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form id="register-form" onSubmit={(e) => handleSubmit(e)}>
                        <FormControl isInvalid={errors.hasOwnProperty("email")}>
                            <FormLabel htmlFor="email">Email address</FormLabel>
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
                        </FormControl>
                        <FormControl
                            isInvalid={errors.hasOwnProperty("password")}
                        >
                            <FormLabel htmlFor="password">Password</FormLabel>
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
                        </FormControl>
                    </form>
                </ModalBody>

                <ModalFooter justifyContent={"space-between"}>
                    {showSignUpForm ? (
                        <HStack>
                            <Text>Already a member?</Text>
                            <Button
                                variant={"unstyled"}
                                onClick={() => setShowSignUpForm(false)}
                            >
                                Login
                            </Button>
                        </HStack>
                    ) : (
                        <HStack>
                            <Text>Not a member?</Text>
                            <Button
                                variant={"unstyled"}
                                onClick={() => setShowSignUpForm(true)}
                            >
                                Sign up
                            </Button>
                        </HStack>
                    )}
                    <HStack mr={3}>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            form="register-form"
                        >
                            Submit
                        </Button>
                        <Button variant={"ghost"} onClick={onClose}>
                            Close
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AuthForm;
