import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputErrorProps {
  message?: string | null;
}

const InputError: React.FC<InputErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <View className="ml-2 mt-2 flex flex-row items-center">
      <Ionicons name="alert-circle" size={13} color="#dc2626" />
      <Text className="ml-1 font-nexa text-xs text-red-600">{message}</Text>
    </View>
  );
};

export default InputError;
