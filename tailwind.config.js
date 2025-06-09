/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // COLORES PRINCIPALES CORREGIDOS SEGÚN TU PALETA
        // Azul oscuro - PRIMARIO (Confianza, estabilidad, botones principales, encabezados)
        primary: {
          50: "#E0F2F5",
          100: "#B3DDE5",
          200: "#80C7D4",
          300: "#4DB0C2",
          400: "#269FB5",
          500: "#004E64", // PRIMARIO - Azul oscuro para confianza y estabilidad
          600: "#004758",
          700: "#003D4A",
          800: "#00333C",
          900: "#00252E",
          950: "#001A20",
        },

        // Azul aguamarina - SECUNDARIO (Toques modernos, botones secundarios, íconos)
        secondary: {
          50: "#E0F7F7",
          100: "#B3EBEB",
          200: "#80DDDD",
          300: "#4DCFCF",
          400: "#26C4C4",
          500: "#00A6A6", // SECUNDARIO - Aguamarina para toques modernos
          600: "#009595",
          700: "#008080",
          800: "#006B6B",
          900: "#005252",
          950: "#003D3D",
        },

        // FONDO CLARO - Escala completa basada en #F9FBFC
        background: {
          50: "#FFFFFF", // Blanco puro
          100: "#F9FBFC", // TU FONDO CLARO PRINCIPAL - Fondo general, sensación de limpieza
          200: "#F3F6F9", // Ligeramente más oscuro
          300: "#E8EDF2", // Gris muy claro
          400: "#D1DBE3", // Gris claro
          500: "#B8C5D1", // Gris medio claro
          600: "#9CAAB8", // Gris medio
          700: "#7A8A9A", // Gris medio oscuro
          800: "#5A6B7A", // Gris oscuro
          900: "#3D4A57", // Gris muy oscuro
          950: "#2A3441", // Casi negro
        },

        // TEXTO PRINCIPAL - Escala completa basada en #1A1A1A
        textPrimary: {
          50: "#F7F7F7", // Casi blanco
          100: "#E8E8E8", // Gris muy claro
          200: "#D1D1D1", // Gris claro
          300: "#B0B0B0", // Gris medio claro
          400: "#888888", // Gris medio
          500: "#6D6D6D", // Gris medio oscuro
          600: "#5D5D5D", // Gris oscuro
          700: "#4F4F4F", // Gris muy oscuro
          800: "#1A1A1A", // TU TEXTO PRINCIPAL - Textos oscuros para buena lectura
          900: "#0F0F0F", // Negro suave
          950: "#000000", // Negro puro
        },

        textSecondary: {
          50: "#F8F9FA", // Casi blanco con tinte azul
          100: "#E9EEF2", // Gris azulado muy claro
          200: "#D3DCE5", // Gris azulado claro
          300: "#B8C4D0", // Gris azulado medio claro
          400: "#9AAAB8", // Gris azulado medio
          500: "#5F6C7B", // TU TEXTO SECUNDARIO PRINCIPAL - Confianza, estabilidad
          600: "#526069", // Más oscuro
          700: "#455057", // Oscuro
          800: "#384045", // Muy oscuro
          900: "#2B3134", // Casi negro azulado
          950: "#1E2427", // Negro azulado
        },

        // Verde - ÉXITO/AHORRO (Indicadores de ahorro, finanzas sanas)
        success: {
          50: "#E8F5E8",
          100: "#C8E6C9",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#66BB6A",
          500: "#4CAF50", // ÉXITO/AHORRO - Verde para indicadores positivos
          600: "#43A047",
          700: "#388E3C",
          800: "#2E7D32",
          900: "#1B5E20",
          950: "#0D4F12",
        },

        // Amarillo/Naranja - ADVERTENCIA/RIESGO (Sugerencias de precaución, proyecciones inciertas)
        warning: {
          50: "#FFF8E1",
          100: "#FFECB3",
          200: "#FFE082",
          300: "#FFD54F",
          400: "#FFCA28",
          500: "#F9A825", // ADVERTENCIA - Amarillo/naranja para precaución
          600: "#F57F17",
          700: "#FF8F00",
          800: "#FF6F00",
          900: "#E65100",
          950: "#BF360C",
        },

        // Rojo - ERROR/GASTO ELEVADO (Advertencias de gasto alto o errores)
        danger: {
          50: "#FFEBEE",
          100: "#FFCDD2",
          200: "#EF9A9A",
          300: "#E57373",
          400: "#EF5350",
          500: "#E53935", // ERROR/GASTO ELEVADO - Rojo para alertas críticas
          600: "#D32F2F",
          700: "#C62828",
          800: "#B71C1C",
          900: "#A91B0C",
          950: "#8B0000",
        },

        // Grises y neutros
        neutral: {
          50: "#F9FBFC", // FONDO CLARO - Fondo general, sensación de limpieza
          100: "#F5F7FA",
          200: "#E4E7EB",
          300: "#CBD2D9",
          400: "#9AA5B1",
          500: "#5F6C7B", // TEXTO SECUNDARIO - Gris medio
          600: "#52606D",
          700: "#3E4C59",
          800: "#1A1A1A", // TEXTO PRINCIPAL - Textos oscuros para buena lectura
          900: "#121212",
          950: "#000000",
        },
      },
    },
  },
  plugins: [],
};
