import { images } from "@/src/constants/images";
import { useColorScheme } from "nativewind";
import { Link } from "expo-router";
import { Image, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <SafeAreaView className=" flex h-full w-full items-center justify-center bg-light-screen px-8 py-5 dark:bg-gray-950">
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#09090b" : "#F7F7FF"} // Android only
      />
      <Image
        source={isDark ? images.error404Dark : images.error404}
        className="h-[180px] w-full"
        resizeMode="contain"
      />
      <Text className="mb-12 text-center font-nexa text-4xl text-gray-500 dark:text-gray-400">
        Page{" "}
        <Text className="text-center font-nexa-extrabold text-gray-700 dark:text-gray-300">
          Not Found
        </Text>
      </Text>
      <Link
        href="/"
        className="rounded-full bg-light-pallete-500 p-5 dark:bg-dark-pallete-500"
      >
        <Text className="text-body-lg text-center font-nexa-bold text-white">
          Bring me to Home
        </Text>
      </Link>
    </SafeAreaView>
  );
}
