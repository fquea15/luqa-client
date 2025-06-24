import API from "./api";

export interface Route {
  routeId: number;
  title: string;
  description: string;
  imageUrl: string;
}


export const getRoutes = async (): Promise<Route[]> => {
  console.log("📡 Llamando a /routes desde frontend...");
  try {
    const response = await API.get("/routes");
    console.log("✅ Respuesta de la API /routes:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener rutas:", error);
    return [];
  }
};
