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
import useAuthForm from "../hooks/useAuthForm";

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
    let url: string;
    if (showSignUpForm) {
        url = "/api/register";
    } else {
        url = "/api/login";
    }

    const { handleSubmit, handleChange, formData, errors, isSubmitting } =
        useAuthForm({ email: "", password: "", url, onClose });

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
                    <form
                        id="register-form"
                        onSubmit={(e) => {
                            handleSubmit(e);
                        }}
                    >
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
                            isLoading={isSubmitting}
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
