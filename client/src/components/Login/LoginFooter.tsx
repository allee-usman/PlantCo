import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import CustomButton from "@/src/components/ui/CustomButton/CustomButton";

interface LoginFooterProps {
  isLoading: boolean;
  onLogin: () => void;
  onClearError: () => void;
  hasError: boolean;
}

export const LoginFooter: React.FC<LoginFooterProps> = ({
  isLoading,
  onLogin,
  onClearError,
  hasError,
}) => {
  return (
    <View className="mt-6 w-full">
      <CustomButton
        label="Login"
        onPress={onLogin}
        loading={isLoading}
        disabled={isLoading}
        bgVariant="gradient"
        textVariant="gradient"
        accessibilityLabel="Log in to your account"
        accessibilityRole="button"
        className="h-[60px] w-full"
      />

      <View className="mt-2 flex-row justify-center">
        <Link
          href="/(auth)/signup"
          disabled={isLoading}
          className="text-body-sm"
          onPress={() => hasError && onClearError()}
        >
          Don&apos;t have an account?{" "}
          <Text className="text-link font-nexa-extrabold">Sign up</Text>
        </Link>
      </View>
    </View>
  );
};
