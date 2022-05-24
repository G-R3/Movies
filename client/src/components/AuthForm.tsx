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
    VStack,
    Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import useAuthForm from "../hooks/useAuthForm";

type Props = {
    isOpen: boolean;
    onClose: any;
};

const AuthForm = ({ isOpen, onClose }: Props): JSX.Element => {
    const [showSignUpForm, setShowSignUpForm] = useState<boolean>(true);

    const { handleSubmit, handleChange, formData, errors, isSubmitting } =
        useAuthForm({ email: "", password: "", showSignUpForm, onClose });

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
                                size={"md"}
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
                                size={"md"}
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
                    {errors.message && (
                        <Text mt={5} color={"red.300"} fontWeight={"bold"}>
                            {errors.message}
                        </Text>
                    )}
                </ModalBody>

                <ModalFooter
                    paddingTop={0}
                    justifyContent={"space-between"}
                    flexDirection={{ base: "column-reverse", sm: "row" }}
                    mt={2}
                >
                    <Flex
                        mt={{ base: 6, sm: 0 }}
                        flexDirection={{ base: "column", sm: "row" }}
                        columnGap={2}
                    >
                        {showSignUpForm ? (
                            <>
                                <Text>Already have an account?</Text>
                                <Button
                                    variant={"link"}
                                    onClick={() => setShowSignUpForm(false)}
                                >
                                    Login
                                </Button>
                            </>
                        ) : (
                            <>
                                <Text>Don't have an account?</Text>
                                <Button
                                    variant={"link"}
                                    onClick={() => setShowSignUpForm(true)}
                                >
                                    Sign up
                                </Button>
                            </>
                        )}
                    </Flex>
                    <Flex
                        w={{ base: "100%", sm: "auto" }}
                        flexDirection={{ base: "column", sm: "row" }}
                        gap={2}
                    >
                        <Button
                            type="submit"
                            colorScheme="blue"
                            form="register-form"
                            w={{ base: "100%" }}
                            isLoading={isSubmitting}
                        >
                            Submit
                        </Button>
                        <Button
                            variant={"outline"}
                            w={{ base: "100%" }}
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AuthForm;
