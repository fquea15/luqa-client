import CustomButton from "@/components/ui/CustomButton";
import InputField from "@/components/ui/InputField";
import { images } from "@/constants";
import { loginUser } from "@/shared/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { LockIcon, MailIcon } from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useAppStore } from "@/shared/store";
import { UserState } from "@/shared/store/slices/user-slice";

console.log(process.env.EXPO_PUBLIC_API_URL);

export default function HomeScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useAppStore() as UserState;

  async function handleLogin() {
    const { email, password } = form;

    if (!email || !password) {
      alert("Completa ambos campos");
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser({ email, password });

      if (!response?.token && !response?.user) {
        alert("No se pudo iniciar sesión");
        return;
      }

      setUserInfo(response?.user);
      await AsyncStorage.setItem("token", response.token);
      router.replace("/home");
    } catch (error: any) {
      console.error("Login error:", error);
      const message = error?.response?.data?.message || "No se pudo conectar al servidor";
      alert(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView className={"flex-1 bg-neutral-50"}>
      <View className={"mx-[30px] flex-1 justify-center"}>
        <View className={"mt-32 h-[140px] flex-row justify-center"}>
          <Image source={images.logoMain} className={"h-full w-full"} resizeMode={"cover"} />
        </View>
        <View className={"mt-[40px]"}>
          <Text className={"text-[32px] font-semibold text-primary-500"}>Inicia Sesión</Text>
        </View>
        <View className={"mt-2"}>
          <InputField
            key={"mail"}
            placeholder="Correo electrónico"
            icon={MailIcon}
            value={form.email}
            onChangeText={value => setForm({ ...form, email: value })}
            containerStyle={"rounded-[10px] "}
            inputStyle={"placeholder:text-textSecondary-400"}
          />
          <InputField
            key={"password"}
            placeholder="Contraseña"
            icon={LockIcon}
            secureTextEntry
            value={form.password}
            onChangeText={value => setForm({ ...form, password: value })}
            containerStyle={"rounded-[10px] "}
            inputStyle={"placeholder:text-textSecondary-400"}
          />
        </View>
        <View className={"mt-8 flex-1 flex-col gap-6"}>
          <CustomButton
            title={loading ? "Iniciando..." : "Iniciar Sesión"}
            onPress={handleLogin}
            disabled={loading}
          />
          <CustomButton
            title="Registrarse"
            bgVariant="secondary"
            onPress={() => router.push("/(auth)/sign-up")}
          />
          <Link href={"/home"} className={"mt-8 text-center"}>
            <Text className={"text-lg text-primary-500"}>¿Olvidaste la contraseña?</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
