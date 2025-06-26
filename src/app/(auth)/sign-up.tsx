import CustomButton from "@/components/ui/CustomButton";
import InputField from "@/components/ui/InputField";
import { images } from "@/constants";
import { registerUser } from "@/shared/services/authService";
import { useRouter } from 'expo-router';
import { LockIcon, MailIcon, UserIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';

console.log(process.env.EXPO_PUBLIC_API_URL)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export default function SignUpScreen() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = form;

    // 🔎 Validaciones
    if (!name || !email || !password || !confirmPassword) {
      return Alert.alert("Error", "Por favor, completa todos los campos.");
    }
    if (!emailRegex.test(email)) {
      return Alert.alert("Error", "Por favor, ingresa un correo válido.");
    }
    if (password.length < 6) {
      return Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
    }
    if (password !== confirmPassword) {
      return Alert.alert("Error", "Las contraseñas no coinciden.");
    }

    setLoading(true);
    try {
      await registerUser({
        fullName: name,
        email,
        password,
      });

      Alert.alert("¡Éxito!", "Registro completado. Ahora inicia sesión.");
      router.replace("/(auth)/sign-in");
    } catch (error: any) {
      console.error("Error en registro:", error);
      const message =
        error?.response?.data?.message || error.message || "Error desconocido en el registro.";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

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
            value={form.name}
            onChangeText={text => handleChange("name", text)}
            containerStyle={"rounded-[10px] "}
            inputStyle={"placeholder:text-textSecondary-400"}
          />
          <InputField
            placeholder="Correo electrónico"
            icon={MailIcon}
            value={form.email}
            onChangeText={text => handleChange("email", text)}
            containerStyle={"rounded-[10px] "}
            inputStyle={"placeholder:text-textSecondary-400"}
          />
          <InputField
            placeholder="Contraseña"
            icon={LockIcon}
            secureTextEntry
            value={form.password}
            onChangeText={text => handleChange("password", text)}
            containerStyle={"rounded-[10px] "}
            inputStyle={"placeholder:text-textSecondary-400"}
          />
          <InputField
            placeholder="Repite la contraseña"
            icon={LockIcon}
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={text => handleChange("confirmPassword", text)}
            medium
            containerStyle={"rounded-[10px] "}
            inputStyle={"placeholder:text-textSecondary-400"}
          />
        </View>

        <View className="mt-10 flex-1 flex-col gap-6">
          <CustomButton
            title={loading ? "Registrando..." : "Registrarse"}
            onPress={handleRegister}
            disabled={loading}
            bgVariant="secondary"
          />

          <Text className="mt-10 text-center text-base text-textSecondary-500">
            ¿Tienes una cuenta?{" "}
            <Text
              onPress={() => router.replace("/(auth)/sign-in")}
              className="font-semibold text-primary-500"
            >
              Inicia Sesión
            </Text>
          </Text>
        </View>
      </View>
      <View className="mt-[40px]">
        <Text className="text-[32px] font-semibold text-primary-500">Crea tu cuenta</Text>
      </View>
      <View />
    </ScrollView>
  );
}
