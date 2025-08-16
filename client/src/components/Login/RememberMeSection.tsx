import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RememberMeSectionProps {
  rememberMe: boolean;
  isLoading: boolean;
  onRememberMeToggle: () => void;
  onForgotPassword?: () => void;
}

export const RememberMeSection: React.FC<RememberMeSectionProps> = ({
  rememberMe,
  isLoading,
  onRememberMeToggle,
  onForgotPassword,
}) => {
  return (
    <View className="mb-8 w-full flex-row items-center justify-between">
      <TouchableOpacity
        className="flex-row items-center"
        onPress={onRememberMeToggle}
        disabled={isLoading}
        activeOpacity={0.7}
      >
        <View
          className={`h-[20px] w-[20px] items-center justify-center rounded-full border-2 ${
            rememberMe
              ? "border-light-accent bg-light-accent dark:border-dark-accent dark:bg-dark-accent"
              : "border-gray-300 bg-light-surface dark:border-gray-700 dark:bg-gray-800"
          }`}
        >
          {rememberMe && <Ionicons name="checkmark" size={14} color="white" />}
        </View>
        <Text className="text-body-sm ml-2">Remember me</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onForgotPassword}
        disabled={isLoading}
        activeOpacity={0.7}
      >
        <Text className="text-link underline">Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
};
