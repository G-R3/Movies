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
    url: string;
    onClose: any;
};
type FormData = {
    email?: string;
    password?: string;
};

const useAuthForm = ({ email, password, url, onClose }: Props) => {
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
            const hasErrors = Object.keys(errors).length !== 0;
            if (!hasErrors) {
                try {
                    const authUser = async (url: string) => {
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
                        if (!data.success) {
                            throw data.message;
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
                        navigate("/");
                    };

                    authUser(url).catch((err) => {
                        setIsSubmitting(false);
                        setErrors({ message: err });
                    });
                } catch (err) {
                    console.error(
                        "Something went wrong while submitting the form"
                    );
                    console.error(err);
                    setIsSubmitting(false);
                }
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
