import CardRoute from "@/components/route/card-route";
import { getRoutes, Route } from "@/shared/services/routeService";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RouteScreen = () => {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const data = await getRoutes();
      setRoutes(data);
    };
    fetchRoutes();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-100">
      <ScrollView className="px-4 py-6">
        <Text className="text-2xl font-bold text-primary-500 mb-2">
          ¿Por dónde quieres empezar?
        </Text>
        <Text className="text-base text-textSecondary-500 mb-6">
          Da el primer paso hacia una mejor relación con tu dinero. Elige una ruta y empieza.
        </Text>

        {routes.map((ruta) => (
          <CardRoute key={ruta.routeId} ruta={ruta} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RouteScreen;
