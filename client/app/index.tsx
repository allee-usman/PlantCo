import { Text, View } from 'react-native';
import './global.css';
import CustomText from '@/src/components/CustomText';

export default function Index() {
	return (
		<View className="flex-1 items-center justify-center bg-white">
			<Text className="text-xl font-bold text-blue-500">
				Welcome to Nativewind!
			</Text>
			<CustomText />
		</View>
	);
}
