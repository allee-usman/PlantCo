import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useLoginForm } from "@/src/hooks/useLoginForm";
import { LoginHeader } from "@/src/components/Login/LoginHeader";
import { ErrorDisplay } from "@/src/components/ui/ResponseErrorDisplay";
import { LoginForm } from "@/src/components/Login/LoginForm";
import { RememberMeSection } from "@/src/components/Login/RememberMeSection";
import { LoginFooter } from "@/src/components/Login/LoginFooter";

export default function LoginScreen() {
  const {
    showPassword,
    setShowPassword,
    formData,
    setFormData,
    focusedField,
    setFocusedField,
    emailError,
    passwordError,
    isLoading,
    error,
    emailRef,
    passwordRef,
    handleFormDataChange,
    handleEmailBlur,
    handlePasswordBlur,
    handleLogin,
    dispatch,
    clearError,
  } = useLoginForm();

  const handleRememberMeToggle = () => {
    setFormData({ ...formData, rememberMe: !formData.rememberMe });
  };

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <SafeAreaView className="flex-1 bg-light-screen py-4 dark:bg-gray-950">
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={20}
        showsVerticalScrollIndicator={false}
      >
        <View className="main-container px-6">
          <LoginHeader hasError={!!error} />

          <ErrorDisplay error={error as string} />

          <LoginForm
            formData={formData}
            showPassword={showPassword}
            focusedField={focusedField}
            emailError={emailError}
            passwordError={passwordError}
            isLoading={isLoading}
            emailRef={emailRef}
            passwordRef={passwordRef}
            onFormDataChange={handleFormDataChange}
            onEmailBlur={handleEmailBlur}
            onPasswordBlur={handlePasswordBlur}
            onFocus={setFocusedField}
            onPasswordToggle={handlePasswordToggle}
            onLogin={handleLogin}
          />

          <RememberMeSection
            rememberMe={formData.rememberMe}
            isLoading={isLoading}
            onRememberMeToggle={handleRememberMeToggle}
          />

          <LoginFooter
            isLoading={isLoading}
            onLogin={handleLogin}
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
