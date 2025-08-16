import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { clearError, registerUser } from "@/src/redux/slices/authSlice";
import { RootState } from "@/src/redux/store";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/src/utils/validations";
import { unwrapResult } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

export interface SignupFormTypes {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useSignupForm = () => {
  // Main form data state
  const [formData, setFormData] = useState<SignupFormTypes>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // UI states
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Error states
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  // Refs for chaining
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state: RootState) => state.auth);

  // Clear Redux error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Generic handler for form data updates
  const handleFormDataChange = (
    field: keyof SignupFormTypes,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "username" || field === "email" ? value.trim() : value,
    }));

    // Clear Redux error when user starts typing
    if (error) {
      dispatch(clearError());
    }

    // Clear corresponding error when user starts typing
    switch (field) {
      case "username":
        if (usernameError) setUsernameError(null);
        break;
      case "email":
        if (emailError) setEmailError(null);
        break;
      case "password":
        if (passwordError) setPasswordError(null);
        break;
      case "confirmPassword":
        if (confirmPasswordError) setConfirmPasswordError(null);
        break;
    }
  };

  // Blur handlers
  const handleUsernameBlur = () => {
    setFocusedField(null);
    if (formData.username || wasSubmitted) {
      const error = validateUsername(formData.username);
      setUsernameError(error);
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

  const handleConfirmPasswordBlur = () => {
    setFocusedField(null);
    if (formData.confirmPassword || wasSubmitted) {
      const error = validateConfirmPassword(
        formData.password,
        formData.confirmPassword,
      );
      setConfirmPasswordError(error);
    }
  };

  // Form submission handling
  const handleSignup = async () => {
    setWasSubmitted(true);

    // Clear previous redux errors before validation
    if (error) {
      dispatch(clearError());
    }

    const usernameValidationError = validateUsername(formData.username);
    const emailValidationError = validateEmail(formData.email);
    const passwordValidationError = validatePassword(formData.password);
    const confirmPasswordValidationError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword,
    );

    setUsernameError(usernameValidationError);
    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);
    setConfirmPasswordError(confirmPasswordValidationError);

    if (
      usernameValidationError ||
      emailValidationError ||
      passwordValidationError ||
      confirmPasswordValidationError
    ) {
      return; // Don't proceed if any field is invalid
    }

    try {
      const action = await dispatch(
        registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      );

      // Unwrap result (throws if rejected)
      const data = unwrapResult(action);

      // Success feedback
      Toast.show({
        type: "success",
        text1: "Account created successfully!",
        text2: "Please login now to continue.",
      });
    } catch (err) {
      const errorMsg =
        typeof err === "string"
          ? err
          : err &&
              typeof err === "object" &&
              "message" in err &&
              typeof err.message === "string"
            ? err.message
            : "Sign Up failed!";
      Toast.show({
        type: "error",
        text1: "Signup failed.",
        text2: errorMsg,
      });

      console.error("Signup error:", err);
    }
  };

  return {
    // State
    formData,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    focusedField,
    setFocusedField,
    usernameError,
    emailError,
    passwordError,
    confirmPasswordError,
    wasSubmitted,
    isLoading,
    error,

    // Refs
    emailRef,
    passwordRef,
    confirmPasswordRef,

    // Methods
    handleFormDataChange,
    handleUsernameBlur,
    handleEmailBlur,
    handlePasswordBlur,
    handleConfirmPasswordBlur,
    handleSignup,
    dispatch,
    clearError,
  };
};
