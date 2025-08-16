import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { loadToken } from "@/src/redux/slices/authSlice";
import { RootState, store } from "@/src/redux/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useCallback, useEffect } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import "./global.css";

import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const dispatch = useAppDispatch();
  const { token, isInitialized } = useAppSelector(
    (state: RootState) => state.auth,
  );

  const [fontsLoaded] = useFonts({
    "Nexa-100": require("../assets/fonts/NexaThin.otf"),
    "Nexa-300": require("../assets/fonts/Nexa-Light.otf"),
    "Nexa-400": require("../assets/fonts/NexaRegular.otf"),
    "Nexa-400-Italic": require("../assets/fonts/Nexa-Regular-Italic.otf"),
    "Nexa-500": require("../assets/fonts/Nexa-Book.otf"),
    "Nexa-600": require("../assets/fonts/Nexa-Bold.otf"),
    "Nexa-700": require("../assets/fonts/Nexa-XBold.otf"),
    "Nexa-800": require("../assets/fonts/NexaHeavy.otf"),
    "Nexa-900": require("../assets/fonts/NexaBlack.otf"),
  });

  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  // Hide the native splash ONLY when both fonts and auth are ready,
  // and after the root view has laid out (avoids a flash).
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && isInitialized) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isInitialized]);

  // if loading, return null to keep splash screen visible
  if (!fontsLoaded || !isInitialized) {
    return null;
  }

  //TODO: Implement the root stack navigator
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Stack initialRouteName={token ? "(root)" : "(auth)"}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppContent />
      <Toast />
    </Provider>
  );
}
