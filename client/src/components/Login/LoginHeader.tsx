import React from "react";
import { View, Text, Image } from "react-native";
import { images } from "@/src/constants/images";

interface LoginHeaderProps {
  hasError?: boolean;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({ hasError }) => {
  return (
    <>
      <View className="z-0 mb-2 flex w-full items-center justify-center">
        <Image
          source={images.ilustration1}
          className="h-[200px]"
          resizeMode="contain"
          alt="Illustration"
        />
      </View>

      <View className={`${hasError ? "mb-4" : "mb-8"} w-full pt-4`}>
        <Text className="text-title text-center">Welcome</Text>
        <Text className="text-body text-center">Glad you&apos;re back!</Text>
      </View>
    </>
  );
};
