import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import './global.css';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		'Nexa-100': require('../assets/fonts/NexaThin.otf'),
		'Nexa-300': require('../assets/fonts/Nexa-Light.otf'),
		'Nexa-400': require('../assets/fonts/NexaRegular.otf'),
		'Nexa-400-Italic': require('../assets/fonts/Nexa-Regular-Italic.otf'),
		'Nexa-500': require('../assets/fonts/Nexa-Book.otf'),
		'Nexa-600': require('../assets/fonts/Nexa-Bold.otf'),
		'Nexa-700': require('../assets/fonts/Nexa-XBold.otf'),
		'Nexa-800': require('../assets/fonts/NexaHeavy.otf'),
		'Nexa-900': require('../assets/fonts/NexaBlack.otf'),
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="+not-found" options={{ headerShown: false }} />
		</Stack>
	);
}
