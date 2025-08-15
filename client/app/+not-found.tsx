import { images } from '@/src/constants/images';
import { useColorScheme } from 'nativewind';
import { Link } from 'expo-router';
import { Image, StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
	const { colorScheme } = useColorScheme();
	const isDark = colorScheme === 'dark';
	return (
		<SafeAreaView className=" bg-light-screen dark:bg-gray-950 h-full w-full px-8 py-5 flex justify-center items-center">
			<StatusBar
				barStyle={isDark ? 'light-content' : 'dark-content'}
				backgroundColor={isDark ? '#09090b' : '#F7F7FF'} // Android only
			/>
			<Image
				source={isDark ? images.error404Dark : images.error404}
				className="w-full h-[180px]"
				resizeMode="contain"
			/>
			<Text className="text-gray-500 dark:text-gray-400 font-nexa text-center text-4xl mb-12">
				Page{' '}
				<Text className="text-gray-700 dark:text-gray-300 text-center font-nexa-extrabold">
					Not Found
				</Text>
			</Text>
			<Link
				href="/"
				className="p-5 rounded-full bg-light-pallete-500 dark:bg-dark-pallete-500"
			>
				<Text className="text-body-lg text-center text-white font-nexa-bold">
					Bring me to Home
				</Text>
			</Link>
		</SafeAreaView>
	);
}
