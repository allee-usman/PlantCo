import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import CustomButton from "@/src/components/ui/CustomButton/CustomButton";

interface SignupFooterProps {
  isLoading: boolean;
  onSignup: () => void;
  onClearError: () => void;
  hasError: boolean;
}

export const SignupFooter: React.FC<SignupFooterProps> = ({
  isLoading,
  onSignup,
  onClearError,
  hasError,
}) => {
  return (
    <View className="w-full space-y-4">
      {/* Sign Up Button */}
      <CustomButton
        label="Sign Up"
        onPress={onSignup}
        loading={isLoading}
        disabled={isLoading}
        bgVariant="gradient"
        textVariant="gradient"
        accessibilityLabel="Sign up for a new account"
        accessibilityRole="button"
        className="h-[60px] w-full"
      />

      {/* Login Link */}
      <View className="mt-2 flex-row justify-center">
        <Link
          href="/(auth)/login"
          disabled={isLoading}
          className="text-body-sm"
          onPress={() => hasError && onClearError()}
        >
          Already have an account?{" "}
          <Text className="text-link font-nexa-extrabold">Login</Text>
        </Link>
      </View>
    </View>
  );
};
