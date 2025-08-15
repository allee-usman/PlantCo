import { Text, View } from 'react-native';
import './global.css';
import CustomText from '@/src/components/CustomText';
import { Link } from 'expo-router';

export default function Index() {
	return (
		<View className="flex-1 items-center justify-center bg-white">
			<Text className="text-xl font-bold text-blue-500">
				Welcome to Nativewind!
			</Text>
			<CustomText />
			<Link href="/+not-found">
				<Text className="text-blue-500">Go to Not Found</Text>
			</Link>
		</View>
	);
}
