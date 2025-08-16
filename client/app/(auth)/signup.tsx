import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useSignupForm } from "@/src/hooks/useSignupForm";
import { ErrorDisplay } from "@/src/components/ui/ResponseErrorDisplay";
import { SignupForm } from "@/src/components/Sign-Up/SignupForm";
import { SignupFooter } from "@/src/components/Sign-Up/SignupFooter";

export default function SignupScreen() {
  const {
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
    isLoading,
    error,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    handleFormDataChange,
    handleUsernameBlur,
    handleEmailBlur,
    handlePasswordBlur,
    handleConfirmPasswordBlur,
    handleSignup,
    dispatch,
    clearError,
  } = useSignupForm();

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <SafeAreaView className="flex-1 bg-light-screen dark:bg-gray-950">
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={20}
        showsVerticalScrollIndicator={false}
      >
        <View className="main-container">
          {/* Title Section */}
          <View className="mb-10">
            <Text className="text-title mb-2 text-center">Sign Up</Text>
            <Text className="text-body px-4 text-center text-gray-600 dark:text-gray-400">
              Just a few details and you&apos;re in.
            </Text>
          </View>

          {/* redux form error display */}
          <ErrorDisplay error={error as string} />

          {/* Signup Form */}
          <SignupForm
            formData={formData}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            focusedField={focusedField}
            usernameError={usernameError}
            emailError={emailError}
            passwordError={passwordError}
            confirmPasswordError={confirmPasswordError}
            isLoading={isLoading}
            emailRef={emailRef}
            passwordRef={passwordRef}
            confirmPasswordRef={confirmPasswordRef}
            onFormDataChange={handleFormDataChange}
            onUsernameBlur={handleUsernameBlur}
            onEmailBlur={handleEmailBlur}
            onPasswordBlur={handlePasswordBlur}
            onConfirmPasswordBlur={handleConfirmPasswordBlur}
            onFocus={setFocusedField}
            onPasswordToggle={handlePasswordToggle}
            onConfirmPasswordToggle={handleConfirmPasswordToggle}
            onSignup={handleSignup}
          />

          {/* Signup Footer */}
          <SignupFooter
            isLoading={isLoading}
            onSignup={handleSignup}
            onClearError={handleClearError}
            hasError={!!error}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
