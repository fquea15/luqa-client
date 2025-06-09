import { cn } from '@/shared/lib/utils';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className='flex h-screen w-screen items-center justify-center bg-blue-950'>
        <Text className={cn("text-gray-100", 1 == 1 ? "" : "")}>Lista de Lecciones</Text>
      </View>
    </SafeAreaView>                         
  );
}