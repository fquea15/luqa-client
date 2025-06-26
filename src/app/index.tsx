import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import { checkUser } from "@/shared/services/authService";
import { useAppStore } from "@/shared/store";
import { UserState } from "@/shared/store/slices/user-slice";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState<"/home" | "/(auth)/sign-in">("/(auth)/sign-in");
  const { setUserInfo } = useAppStore() as UserState;

  useEffect(() => {
    (async () => {
      try {
        const response = await checkUser();

        if (response?.isValid && response.user) {
          setUserInfo(response.user);
          setRedirectTo("/home");
        } else {
          setRedirectTo("/(auth)/sign-in");
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setRedirectTo("/(auth)/sign-in");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <ActivityIndicator size="large" color="#3b82f6" /> {/* azul-500 */}
      </View>
    );
  }

  return <Redirect href={redirectTo} />;
}
