import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { BASE_URL = "/" } = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    build: {
      chunkSizeWarningLimit: 1000, // Увеличиваем лимит до 1000 кБ (1 МБ)
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Группируем библиотеки чартов
            if (id.includes("recharts") || id.includes("d3")) {
              return "recharts";
            }
            // Выделяем React и связанные пакеты
            if (
              id.includes("node_modules/react") ||
              id.includes("node_modules/react-dom")
            ) {
              return "react-vendor";
            }
            // Остальные node_modules
            if (id.includes("node_modules")) {
              return "vendors";
            }
          },
        },
      },
    },
    base: mode === "production" ? BASE_URL : "/",
  };
});
