import { useRef, useState } from "react";
import { TextInput } from "react-native";
import { validateEmail, validatePassword } from "@/src/utils/validations";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { clearError, loginUser } from "@/src/redux/slices/authSlice";
import { RootState } from "@/src/redux/store";
import { unwrapResult } from "@reduxjs/toolkit";

export interface LoginFormTypes {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const useLoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [formData, setFormData] = useState<LoginFormTypes>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state: RootState) => state.auth);

  const handleFormDataChange = (field: keyof LoginFormTypes, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (error) {
      dispatch(clearError());
    }

    switch (field) {
      case "email":
        if (emailError) setEmailError(null);
        break;
      case "password":
        if (passwordError) setPasswordError(null);
        break;
    }
  };

  const handleEmailBlur = () => {
    setFocusedField(null);
    if (formData.email || wasSubmitted) {
      const error = validateEmail(formData.email);
      setEmailError(error);
    }
  };

  const handlePasswordBlur = () => {
    setFocusedField(null);
    if (formData.password || wasSubmitted) {
      const error = validatePassword(formData.password);
      setPasswordError(error);
    }
  };

  const handleLogin = async () => {
    setWasSubmitted(true);

    if (error) {
      dispatch(clearError());
    }

    const emailValidationError = validateEmail(formData.email);
    const passwordValidationError = validatePassword(formData.password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (emailValidationError || passwordValidationError) {
      return;
    }

    try {
      const action = await dispatch(loginUser(formData));
      const resData = unwrapResult(action);
      // router.replace('/(root)/(tabs)/home'); //TODO: uncomment when navigation is set up
    } catch (error) {
      alert(error || "Login failed. Please try again!");
    }
  };

  return {
    // State
    showPassword,
    setShowPassword,
    formData,
    setFormData,
    focusedField,
    setFocusedField,
    emailError,
    passwordError,
    wasSubmitted,
    isLoading,
    error,

    // Refs
    emailRef,
    passwordRef,

    // Methods
    handleFormDataChange,
    handleEmailBlur,
    handlePasswordBlur,
    handleLogin,
    dispatch,
    clearError,
  };
};
