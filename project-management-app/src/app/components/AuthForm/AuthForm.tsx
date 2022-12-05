import React, { useEffect } from 'react';
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from "@hookform/error-message";

import { Box, Button, TextField } from '@mui/material';

import { VALIDATORS } from '../../utils/validation';
import styles from './Form.module.css';
import { useAppDispatch } from "../../hooks";
import { FormContext } from "../../store/reducers/commonSlice";
import { useTranslation } from 'react-i18next';
import { PayloadAction } from '@reduxjs/toolkit';


interface ISignInForm {
  name: string;
  login: string;
  password: string;
}

interface IFormProps {
  isAllValidate: boolean,
  serverRequest: (data: ISignInForm) => Promise<void>,
  setState: (payload: FormContext) => PayloadAction<FormContext | null>,
  contentForm: string,
  stateForm: FormContext | null,
}

export const AuthForm = ({ isAllValidate, serverRequest, setState, contentForm, stateForm }: IFormProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const validationSchema = yup.object(
    isAllValidate
      ? {
        password: yup
          .string()
          .required(t('errorsForm.required') || '')
          .min(VALIDATORS.PASSWORD.minLength.value, t('errorsForm.minLengthPassword') || '')
          .max(VALIDATORS.PASSWORD.maxLength.value, t('errorsForm.maxLengthPassword') || '')
          .matches(VALIDATORS.PASSWORD.pattern.value, t('errorsForm.patternPassword') || ''),
        login: yup
          .string()
          .required(t('errorsForm.required') || '')
          .min(VALIDATORS.TEXT.minLength.value, t('errorsForm.minLengthText') || '')
          .max(VALIDATORS.TEXT.maxLength.value, t('errorsForm.maxLengthText') || '')
          .matches(VALIDATORS.TEXT.pattern.value, t('errorsForm.patternText') || ''),
        name: yup
          .string()
          .required(t('errorsForm.required') || '')
          .min(VALIDATORS.TEXT.minLength.value, t('errorsForm.minLengthText') || '')
          .max(VALIDATORS.TEXT.maxLength.value, t('errorsForm.maxLengthText') || '')
          .matches(VALIDATORS.TEXT.pattern.value, t('errorsForm.patternText') || ''),
      }
      : {
        password: yup
          .string()
          .required(t('errorsForm.required') || '')
          .min(VALIDATORS.PASSWORD.minLength.value, t('errorsForm.minLengthPassword') || '')
          .max(VALIDATORS.PASSWORD.maxLength.value, t('errorsForm.maxLengthPassword') || '')
          .matches(VALIDATORS.PASSWORD.pattern.value, t('errorsForm.patternPassword') || ''),
        login: yup
          .string()
          .required(t('errorsForm.required') || '')
          .min(VALIDATORS.TEXT.minLength.value, t('errorsForm.minLengthText') || '')
          .max(VALIDATORS.TEXT.maxLength.value, t('errorsForm.maxLengthText') || '')
          .matches(VALIDATORS.TEXT.pattern.value, t('errorsForm.patternText') || ''),
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

  
  const placeholderName = t(`${contentForm}.placeholderName`);
  const labelName = t(`${contentForm}.labelName`);
  const placeholderLogin = t(`${contentForm}.placeholderLogin`);
  const labelLogin = t(`${contentForm}.labelLogin`);
  const placeholderPassword = t(`${contentForm}.placeholderPassword`);
  const labelPassword = t(`${contentForm}.labelPassword`);
  const buttonContent = t(`${contentForm}.button`);

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
          helperText={<ErrorMessage errors={errors} name="password" />}
        />
        <Button variant="contained" type="submit" sx={{ marginTop: "1rem", padding: '10px' }}>
          {buttonContent}
        </Button>
      </Box>
    </form>
  )
}
