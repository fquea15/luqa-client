import CustomButton from "@/components/ui/CustomButton";
import InputField from "@/components/ui/InputField";
import { images } from "@/constants";
import { Link } from "expo-router";
import { LockIcon, MailIcon } from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <ScrollView className={"flex-1 bg-neutral-50"}>
      <View className={"mx-[20px] flex-1 justify-center"}>
        <View className={"mt-32 h-[140px] flex-row justify-center"}>
          <Image source={images.logoMain} className={"h-full w-full"} resizeMode={"cover"} />
        </View>
        <View className={"mt-[40px]"}>
          <Text className={"text-[32px] font-semibold text-primary-500"}>Inicia Sesión</Text>
        </View>
        <View className={"mt-2"}>
          <InputField
            label={"Correo electrónico"}
            key={"mail"}
            placeholder="Ingresa tu correo electrónico"
            icon={MailIcon}
            value={form.email}
            onChangeText={value => setForm({ ...form, email: value })}
            containerStyle={"rounded-[10px] "}
            inputStyle={"placeholder:text-textSecondary-400"}
          />
          <InputField
            label={"Contraseña"}
            key={"password"}
            placeholder="Ingresa tu correo electrónico"
            icon={LockIcon}
            value={form.email}
            onChangeText={value => setForm({ ...form, email: value })}
            containerStyle={"rounded-[10px] "}
            inputStyle={"placeholder:text-textSecondary-400"}
          />
        </View>
        <View className={"mt-8 flex-1 flex-col gap-6"}>
          <CustomButton title={"Iniciar Sesión"} />
          <CustomButton title={"Registrarse"} bgVariant={"secondary"} />
          <Link href={"/welcome"} className={"mt-8 text-center"}>
            <Text className={"text-lg text-primary-500"}>¿Olvidaste la contraseña?</Text>
          </Link>
          
          <Link href="/(root)/(tabs)/home" className="mt-8 text-center">
            <Text className="text-lg text-primary-500">Ir a la app</Text>
          </Link>

        </View>
      </View>
    </ScrollView>
  );
}
