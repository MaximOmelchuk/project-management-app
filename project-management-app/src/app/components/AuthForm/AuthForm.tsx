import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler, Controller, useFormState } from "react-hook-form";
import { loginValidation, passwordValidation } from './validation';
import { ErrorMessage } from "@hookform/error-message";
import { Box } from '@mui/system';

interface ISignInForm {
    name: string;
    login: string;
    password: string;
}

interface SignInProps {
    signIn: (email: string, password: string) => Promise<void>;
    emailFromUrl?: string;
    passwordFromUrl?: string;
}

export const AuthForm: React.FC = () => {
    /* useEffect(() => {
        if (error) {
            setError("password", { type: "auth", message: getErrorMessageFirebase(error.code) });
        }
    }, [error]); */

    /*   const schemaPassword = yup.object({
          password: yup
              .string()
              .required(VALIDATORS.PASSWORD.required)
              .max(VALIDATORS.PASSWORD.maxLength.value, VALIDATORS.PASSWORD.maxLength.message)
              .min(VALIDATORS.PASSWORD.minLength.value, VALIDATORS.PASSWORD.minLength.message),
      }); */

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ISignInForm>({
        defaultValues: {
            name: '',
            login: '',
            password: '',
        }
    });

    // const { handleSubmit, control } = useForm<ISignInForm>();
    // const { errors } = useFormState({
    //     control
    // })

    const onSubmit: SubmitHandler<ISignInForm> = (data) => {
        console.log(data);
    };

    return (
        <>
            <Typography variant="h4">Sign In</Typography>

            <form onSubmit={handleSubmit(onSubmit)} data-testid="signIn-form">
                <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <TextField
                        id="text"
                        type="text"
                        placeholder="Enter your name"
                        label={"Name"}
                        /* hidden={!!emailFromUrl} */
                        {...register("name")}
                        error={!!errors.login?.message}
                        helperText={<ErrorMessage errors={errors} name="name" />}
                    />

                    <TextField
                        id="text"
                        type="text"
                        placeholder="Enter your login"
                        label={"Login"}
                        /* hidden={!!emailFromUrl} */
                        {...register("login")}
                        error={!!errors.login?.message}
                        helperText={<ErrorMessage errors={errors} name="login" />}
                    />

                    <TextField
                        id="password"
                        placeholder="Enter password"
                        label={"Password"}
                        type="password"
                        /* hidden={!emailFromUrl} */
                        {...register("password")}
                        error={!!errors.password?.message}
                        helperText={errors.password?.message}
                    />

                    <Button variant="contained" type="submit" sx={{ marginTop: "1rem" }}>
                        {!'emailFromUrl' ? "Continue" : "Sign In"}
                    </Button>
                </Box>
            </form>
        </>
    )
}
