import CardRoute from "@/components/route/card-route";
import { getRoutes, Route } from "@/shared/services/routeService";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

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
    <ScrollView className="bg-background-100 px-4 py-6">
      <Text className="mb-2 text-2xl font-bold text-primary-500">¿Por dónde quieres empezar?</Text>
      <Text className="mb-6 text-base text-textSecondary-500">
        Da el primer paso hacia una mejor relación con tu dinero. Elige una ruta y empieza.
      </Text>

      {routes.map(ruta => (
        <CardRoute key={ruta.routeId} ruta={ruta} />
      ))}
    </ScrollView>
  );
};

export default RouteScreen;
