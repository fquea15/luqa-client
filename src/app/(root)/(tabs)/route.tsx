import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className='flex h-screen w-screen items-center justify-center bg-blue-950'>
        <Text className='text-gray-100'>Lista de Rutas</Text>
      </View>
    </SafeAreaView>
  );
}