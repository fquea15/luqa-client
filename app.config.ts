import "dotenv/config";

export default {
  expo: {
    name: "luqa-client",
    slug: "luqa-client",
    extra: {
      API_URL: process.env.API_URL,
    },
        plugins: ["expo-video"], // ✅ AÑADIDO AQUÍ
  },
};
