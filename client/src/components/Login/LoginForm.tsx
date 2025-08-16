import React from "react";
import { View } from "react-native";
import InputField from "@/src/components/ui/InputField/InputField";
import { AutoCapitalize, TextContentType } from "@/src/interfaces/enums";
import { LoginFormTypes } from "@/src/hooks/useLoginForm";

interface LoginFormProps {
  formData: LoginFormTypes;
  showPassword: boolean;
  focusedField: string | null;
  emailError: string | null;
  passwordError: string | null;
  isLoading: boolean;
  emailRef: React.RefObject<any>;
  passwordRef: React.RefObject<any>;
  onFormDataChange: (field: keyof LoginFormTypes, value: string) => void;
  onEmailBlur: () => void;
  onPasswordBlur: () => void;
  onFocus: (field: string) => void;
  onPasswordToggle: () => void;
  onLogin: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  showPassword,
  focusedField,
  emailError,
  passwordError,
  isLoading,
  emailRef,
  passwordRef,
  onFormDataChange,
  onEmailBlur,
  onPasswordBlur,
  onFocus,
  onPasswordToggle,
  onLogin,
}) => {
  return (
    <View className="w-full">
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

      <InputField
        placeholder="Password"
        leftIcon="lock-closed-outline"
        rightIconAccessibleLabel="Toggle password visibility"
        accessibilityLabel="Password input field"
        editable={!isLoading}
        returnKeyType="done"
        autoComplete="password"
        textContentType={TextContentType.PASSWORD}
        value={formData.password}
        onChangeText={(text) => onFormDataChange("password", text)}
        secureTextEntry={showPassword}
        rightIcon={showPassword ? "eye-outline" : "eye-off-outline"}
        onRightIconPress={onPasswordToggle}
        inputRef={passwordRef}
        onFocus={() => onFocus("password")}
        onBlur={onPasswordBlur}
        isFocused={focusedField === "password"}
        error={passwordError}
        onSubmitEditing={onLogin}
      />
    </View>
  );
};
