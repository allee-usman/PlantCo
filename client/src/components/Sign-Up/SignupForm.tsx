import React from "react";
import { View } from "react-native";
import InputField from "@/src/components/ui/InputField/InputField";
import { AutoCapitalize, TextContentType } from "@/src/interfaces/enums";
import { SignupFormTypes } from "@/src/hooks/useSignupForm";

interface SignupFormProps {
  formData: SignupFormTypes;
  showPassword: boolean;
  showConfirmPassword: boolean;
  focusedField: string | null;
  usernameError: string | null;
  emailError: string | null;
  passwordError: string | null;
  confirmPasswordError: string | null;
  isLoading: boolean;
  emailRef: React.RefObject<any>;
  passwordRef: React.RefObject<any>;
  confirmPasswordRef: React.RefObject<any>;
  onFormDataChange: (field: keyof SignupFormTypes, value: string) => void;
  onUsernameBlur: () => void;
  onEmailBlur: () => void;
  onPasswordBlur: () => void;
  onConfirmPasswordBlur: () => void;
  onFocus: (field: string) => void;
  onPasswordToggle: () => void;
  onConfirmPasswordToggle: () => void;
  onSignup: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  formData,
  showPassword,
  showConfirmPassword,
  focusedField,
  usernameError,
  emailError,
  passwordError,
  confirmPasswordError,
  isLoading,
  emailRef,
  passwordRef,
  confirmPasswordRef,
  onFormDataChange,
  onUsernameBlur,
  onEmailBlur,
  onPasswordBlur,
  onConfirmPasswordBlur,
  onFocus,
  onPasswordToggle,
  onConfirmPasswordToggle,
  onSignup,
}) => {
  return (
    <View className="mb-8 w-full space-y-4">
      {/* Username Field */}
      <InputField
        placeholder="Username"
        leftIcon="person-circle-outline"
        autoCapitalize={AutoCapitalize.NONE}
        autoComplete="username"
        textContentType={TextContentType.USERNAME}
        returnKeyType="next"
        editable={!isLoading}
        value={formData.username}
        onChangeText={(text) => onFormDataChange("username", text)}
        accessibilityLabel="Username input field"
        onSubmitEditing={() => emailRef.current?.focus()}
        onFocus={() => onFocus("username")}
        onBlur={onUsernameBlur}
        isFocused={focusedField === "username"}
        error={usernameError}
      />

      {/* Email Field */}
      <InputField
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize={AutoCapitalize.NONE}
        autoComplete="email"
        textContentType={TextContentType.EMAIL_ADDRESS}
        returnKeyType="next"
        accessibilityLabel="Email input field"
        value={formData.email}
        leftIcon="mail-outline"
        onChangeText={(text) => onFormDataChange("email", text)}
        inputRef={emailRef}
        onSubmitEditing={() => passwordRef.current?.focus()}
        onFocus={() => onFocus("email")}
        onBlur={onEmailBlur}
        isFocused={focusedField === "email"}
        error={emailError}
        editable={!isLoading}
      />

      {/* Password Input */}
      <InputField
        placeholder="Password"
        leftIcon="lock-closed-outline"
        rightIconAccessibleLabel="Toggle password visibility"
        accessibilityLabel="Password input field"
        editable={!isLoading}
        returnKeyType="next"
        autoComplete="password"
        textContentType={TextContentType.PASSWORD}
        value={formData.password}
        onChangeText={(text) => onFormDataChange("password", text)}
        secureTextEntry={showPassword}
        rightIcon={showPassword ? "eye-outline" : "eye-off-outline"}
        onRightIconPress={onPasswordToggle}
        inputRef={passwordRef}
        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        onFocus={() => onFocus("password")}
        onBlur={onPasswordBlur}
        isFocused={focusedField === "password"}
        error={passwordError}
      />

      {/* Confirm Password Input */}
      <InputField
        placeholder="Confirm Password"
        leftIcon="lock-closed-outline"
        rightIconAccessibleLabel="Toggle password visibility"
        accessibilityLabel="Confirm password input field"
        editable={!isLoading}
        returnKeyType="done"
        autoComplete="password-new"
        textContentType={TextContentType.NEW_PASSWORD}
        value={formData.confirmPassword}
        onChangeText={(text) => onFormDataChange("confirmPassword", text)}
        secureTextEntry={showConfirmPassword}
        rightIcon={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
        onRightIconPress={onConfirmPasswordToggle}
        inputRef={confirmPasswordRef}
        onFocus={() => onFocus("confirmPassword")}
        onBlur={onConfirmPasswordBlur}
        isFocused={focusedField === "confirmPassword"}
        error={confirmPasswordError}
        onSubmitEditing={onSignup}
      />
    </View>
  );
};
