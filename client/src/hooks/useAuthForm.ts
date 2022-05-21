import { ChangeEvent, FormEvent, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
type ErrorData = {
    email?: string;
    password?: string;
    message?: string;
};
type Props = {
    email?: string;
    password?: string;
    showSignUpForm: boolean;
    onClose: any;
};
type FormData = {
    email?: string;
    password?: string;
};

const useAuthForm = ({ email, password, showSignUpForm, onClose }: Props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        email: email,
        password: password,
    });
    const [errors, setErrors] = useState<ErrorData>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { getIsLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (isSubmitting) {
            const hasNoErrors = Object.keys(errors).length !== 0;
            if (!hasNoErrors) {
                let url: string = showSignUpForm
                    ? "/auth/register"
                    : "/auth/login";

                const authUser = async (url: string) => {
                    try {
                        const response = await fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(formData),
                        });

                        if (response.status === 404) {
                            throw new Error("Failed to submit form");
                        }

                        const data = await response.json();
                        if (!data.success) {
                            throw new Error(data.message);
                        }

                        setErrors({});
                        setFormData({
                            email: "",
                            password: "",
                        });
                        setIsSubmitting(false);
                        onClose();
                        // use the optional chaining (?.) operator when invoking the function.
                        await getIsLoggedIn?.();
                        navigate("/profile");
                    } catch (err: any) {
                        if (err.message) {
                            setErrors({ message: err.message });
                        } else {
                            setErrors({ message: "Something went wrong" });
                        }
                        setIsSubmitting(false);
                    }
                };
                authUser(url);
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const validate = (values: FormData): ErrorData => {
        let errors: ErrorData = {};

        if (!values.email) {
            errors.email = "Required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = "Invalid email address";
        }

        if (!values.password) {
            errors.password = "Required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }

        return errors;
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();
        const validationErrors = validate(formData);
        setIsSubmitting(true);
        setErrors(validationErrors);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return { handleSubmit, handleChange, formData, errors, isSubmitting };
};

export default useAuthForm;
