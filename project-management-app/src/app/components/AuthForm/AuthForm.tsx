import React, { useEffect } from 'react';
import * as yup from "yup";
import { useNavigate } from 'react-router';
import { useForm, SubmitHandler } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from "@hookform/error-message";

import { Box, Button, TextField } from '@mui/material';

import { VALIDATORS } from '../../utils/validation';
import styles from './Form.module.css';
import { useAppDispatch } from "../../hooks";
import { FormContext } from "../../store/reducers/commonSlice";


interface ISignInForm {
  name: string;
  login: string;
  password: string;
}

interface IFormProps {
  isAllValidate: boolean,
  serverRequest: (data: ISignInForm) => Promise<void>,
  setState: (payload: FormContext) => any,
  contentForm: any,
  stateForm: any,
}

export const AuthForm = ({ isAllValidate, serverRequest, setState, contentForm, stateForm }: IFormProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const validationSchema = yup.object(
    isAllValidate
      ? {
        password: yup
          .string()
          .required(VALIDATORS.PASSWORD.required)
          .min(VALIDATORS.PASSWORD.minLength.value, VALIDATORS.PASSWORD.minLength.message)
          .max(VALIDATORS.PASSWORD.maxLength.value, VALIDATORS.PASSWORD.maxLength.message)
          .matches(VALIDATORS.PASSWORD.pattern.value, VALIDATORS.PASSWORD.pattern.message),
        login: yup
          .string()
          .required(VALIDATORS.TEXT.required)
          .min(VALIDATORS.TEXT.minLength.value, VALIDATORS.TEXT.minLength.message)
          .max(VALIDATORS.TEXT.maxLength.value, VALIDATORS.TEXT.maxLength.message)
          .matches(VALIDATORS.TEXT.pattern.value, VALIDATORS.TEXT.pattern.message),
        name: yup
          .string()
          .required(VALIDATORS.TEXT.required)
          .min(VALIDATORS.TEXT.minLength.value, VALIDATORS.TEXT.minLength.message)
          .max(VALIDATORS.TEXT.maxLength.value, VALIDATORS.TEXT.maxLength.message)
          .matches(VALIDATORS.TEXT.pattern.value, VALIDATORS.TEXT.pattern.message),
      }
      : {
        password: yup
          .string()
          .required(VALIDATORS.PASSWORD.required)
          .min(VALIDATORS.PASSWORD.minLength.value, VALIDATORS.PASSWORD.minLength.message)
          .max(VALIDATORS.PASSWORD.maxLength.value, VALIDATORS.PASSWORD.maxLength.message)
          .matches(VALIDATORS.PASSWORD.pattern.value, VALIDATORS.PASSWORD.pattern.message),
        login: yup
          .string()
          .required(VALIDATORS.TEXT.required)
          .min(VALIDATORS.TEXT.minLength.value, VALIDATORS.TEXT.minLength.message)
          .max(VALIDATORS.TEXT.maxLength.value, VALIDATORS.TEXT.maxLength.message)
          .matches(VALIDATORS.TEXT.pattern.value, VALIDATORS.TEXT.pattern.message),
      }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ISignInForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: stateForm?.name,
      login: stateForm?.login,
      password: '',
    }
  });

  useEffect(() => {
    watch((value) => {
      const data = {
        name: value.name,
        login: value.login as string
      }
      dispatch(setState(data));
    });
  }, [dispatch, setState, watch]);

  const onSubmit: SubmitHandler<ISignInForm> = async (data) => {
    serverRequest(data);
  };

  const placeholderName = contentForm.en?.placeholderName;
  const labelName = contentForm.en?.labelName ;
  const placeholderLogin = contentForm?.placeholderLogin;
  const labelLogin = contentForm.en?.labelLogin;
  const placeholderPassword = contentForm.en?.placeholderPassword;
  const labelPassword = contentForm.en?.labelPassword;
  const buttonContent = contentForm.en?.button;

  return (
    <form className={styles['wrapper-form']} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {isAllValidate && <TextField
          type="text"
          placeholder={placeholderName}
          label={labelName}
          autoComplete="off"
          {...register("name")}
          error={!!errors.name?.message}
          helperText={<ErrorMessage errors={errors} name="name" />}
        />}

        <TextField
          type="text"
          placeholder={placeholderLogin}
          label={labelLogin}
          autoComplete="off"
          {...register("login")}
          error={!!errors.login?.message}
          helperText={<ErrorMessage errors={errors} name="login" />}
        />

        <TextField
          placeholder={placeholderPassword}
          label={labelPassword}
          type="password"
          autoComplete="off"
          {...register("password")}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
        />
        <Button variant="contained" type="submit" sx={{ marginTop: "1rem", padding: '10px' }}>
          {buttonContent}
        </Button>
      </Box>
    </form>
  )
}
