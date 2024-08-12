import { loadEnv } from 'vite'
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { createHtmlPlugin } from "vite-plugin-html";

export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            naverKey: env.VITE_NAVER_MAP_API_KEY,
            tMapKey: env.VITE_TMAP_API_KEY
          },
        },
      }),
    ],
  };
};
