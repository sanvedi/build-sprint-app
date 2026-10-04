import { defineConfig, loadEnv } from "vite";
export default defineConfig(({mode})=>{const env=loadEnv(mode,process.cwd(),"");return {define:{__CONVEX_URL__:JSON.stringify(env.CONVEX_URL || "")}};});
