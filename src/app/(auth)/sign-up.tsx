import CustomButton from '@/components/ui/CustomButton';
import InputField from '@/components/ui/InputField';
import { images } from '@/constants';
import { registerUser } from "@/shared/services/authService";
import { useRouter } from 'expo-router';
import { LockIcon, MailIcon, UserIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';

console.log(process.env.EXPO_PUBLIC_API_URL)

export default function SignUpScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    try {
      await registerUser({
        fullName: name,
        email,
        password,
        profilePicture: "image.png",
      });
      Alert.alert('Éxito', 'Registro completado. Ahora inicia sesión.');
      router.push('/(auth)/sign-in');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error en el registro');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView className="flex-1 bg-neutral-50">
      <View className="mx-[30px] flex-1 justify-center">
        <View className={"mt-32 h-[100px] flex-row justify-center"}>
          <Image source={images.logoMain} className={"h-[100px] w-[250px]"} resizeMode={"cover"} />
        </View>
        <View className="mt-[40px]">
          <Text className="text-[32px] font-semibold text-primary-500">Crea tu cuenta</Text>
        </View>

        <View className="mt-2">
          <InputField
            placeholder="Nombre completo"
            icon={UserIcon}
            value={name}
            onChangeText={setName}
            containerStyle={"rounded-[10px] "}
            inputStyle={"placeholder:text-textSecondary-400"}
          />
          <InputField
            placeholder="Correo electrónico"
            icon={MailIcon}
            value={email}
            onChangeText={setEmail}
            containerStyle={"rounded-[10px] "}
            inputStyle={"placeholder:text-textSecondary-400"}
          />
          <InputField
            placeholder="Contraseña"
            icon={LockIcon}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            containerStyle={"rounded-[10px] "}
            inputStyle={"placeholder:text-textSecondary-400"}
          />
          <InputField
            placeholder="Repite la contraseña"
            icon={LockIcon}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            medium
            containerStyle={"rounded-[10px] "}
            inputStyle={"placeholder:text-textSecondary-400"}
          />
        </View>

        <View className="mt-10 flex-1 flex-col gap-6">
          <CustomButton
            title={loading ? 'Registrando...' : 'Registrarse'}
            onPress={handleRegister}
            disabled={loading}
            bgVariant="secondary"
          />

          <Text className="mt-10 text-center text-base text-textSecondary-500">
            ¿Tienes una cuenta?{' '}
            <Text
              onPress={() => router.push('/(auth)/sign-in')}
              className="text-primary-500 font-semibold"
            >
              Inicia Sesión
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
