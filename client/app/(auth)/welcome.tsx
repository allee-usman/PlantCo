import CustomButton from "@/src/components/ui/CustomButton/CustomButton";
import { onboarding } from "@/src/constants/onboarding";
import { OnboardingItem } from "@/src/interfaces/interface";
import { getSecureItem, saveSecureItem } from "@/src/utils/secureStore";
import { Redirect, router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const { width } = Dimensions.get("window");

export default function Onboarding() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const swiperRef = useRef<SwiperFlatList>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isLastPage = activeIndex === onboarding.length - 1;

  const handleContinue = async () => {
    await saveSecureItem("hasSeenWelcome", "true");
    router.replace("/(auth)/signup");
  };

  const handleNext = () => {
    swiperRef.current?.scrollToIndex({
      index: activeIndex + 1,
      animated: true,
    });
  };

  const dotElem = useMemo(
    () => ({
      width: 10,
      height: 10,
      backgroundColor: "#d1d5db",
      borderRadius: 999,
      marginHorizontal: 4,
    }),
    [],
  );

  const activeDotElem = useMemo(
    () => ({
      width: 20,
      height: 10,
      backgroundColor: isDark ? "#00a377" : "#4d7111",
      borderRadius: 999,
      marginHorizontal: 4,
    }),
    [isDark],
  );

  useEffect(() => {
    (async () => {
      const seen = await getSecureItem("hasSeenWelcome");
      if (seen === "true") {
        setShouldRedirect(true);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <ActivityIndicator />;
  if (shouldRedirect) return <Redirect href="/(auth)/login" />;

  const lastPage = (item: OnboardingItem) => (
    <View key={item.id} className="flex h-full flex-col pl-5">
      <Text className="text-title-variant mb-2 ml-1 mt-6 px-3">
        {item.title}
      </Text>
      <Text className="text-body mx-6 mb-2 w-[200px] leading-6">
        {item.description}
      </Text>
      <View className="relative flex-1">
        <Image
          source={item.image}
          className="absolute -right-[50%] bottom-[10%] h-[100%]"
          resizeMode="contain"
          accessibilityLabel={item.title}
        />
      </View>
    </View>
  );

  const content = onboarding.map((item, index) => {
    if (index === onboarding.length - 1) {
      return lastPage(item);
    }
    return (
      <View
        key={item.id}
        className="flex h-full flex-col items-center justify-center gap-4 p-6"
      >
        <View className="z-0 mb-10 flex h-[40%] w-full items-center justify-center">
          <Image
            source={item.image}
            className="h-[100%]"
            resizeMode="contain"
            accessibilityLabel={item.title}
          />
        </View>
        <Text className="text-heading-1 mx-3 mb-3">{item.title}</Text>
        <Text className="text-body mx-3 text-justify leading-6">
          {item.description}
        </Text>
      </View>
    );
  });

  return (
    <SafeAreaView className="flex h-full w-full items-center justify-between bg-light-screen py-5 dark:bg-gray-950">
      {/* Skip Button */}
      <StatusBar />
      <TouchableOpacity
        className="w-full items-end justify-center pr-5"
        accessibilityLabel="Skip onboarding"
        accessibilityRole="button"
        onPress={async () => {
          await saveSecureItem("hasSeenWelcome", "true");
          router.replace("/(auth)/signup");
        }}
      >
        <Text className="text-body-sm font-nexa-bold tracking-widest">
          Skip
        </Text>
      </TouchableOpacity>

      {/* Swiper */}
      <SwiperFlatList
        ref={swiperRef}
        data={content}
        renderItem={({ item }) => <View style={{ width }}>{item}</View>}
        onChangeIndex={({ index }) => setActiveIndex(index)}
        showPagination
        PaginationComponent={({ paginationIndex, size }) => (
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "transparent",
              paddingHorizontal: 3,
              paddingVertical: 4,
              borderRadius: 999,
              alignSelf: "center",
              position: "absolute",
              bottom: "15%",
            }}
          >
            {Array.from({ length: size }).map((_, i) => (
              <View
                key={i}
                style={i === paginationIndex ? activeDotElem : dotElem}
              />
            ))}
          </View>
        )}
      />

      {/* Next / Get Started Button */}
      <View className="mb-2 w-full px-5">
        <CustomButton
          label={isLastPage ? "Let's get started" : "Next"}
          bgVariant="gradient"
          textVariant="gradient"
          className="h-[60px] w-full"
          accessibilityLabel="Next Button"
          accessibilityRole="button"
          onPress={isLastPage ? handleContinue : handleNext}
        />
      </View>
    </SafeAreaView>
  );
}
