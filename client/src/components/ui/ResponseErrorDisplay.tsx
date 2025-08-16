import React from "react";
import { View, Text } from "react-native";

interface ErrorDisplayProps {
  error: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  return (
    <View className="mb-6 w-full rounded-lg border border-red-300 bg-red-100 p-3">
      <Text className="text-center font-nexa text-sm text-red-700">
        {error}
      </Text>
    </View>
  );
};
