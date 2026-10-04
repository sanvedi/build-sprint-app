import { defineConfig, loadEnv } from "vite";
import {previewNames} from "./src/statePreview.mjs";
export default defineConfig(({mode})=>{
 const env=loadEnv(mode,process.cwd(),"");
 return {
  // Static hosting supplies the production backend address during its build.
  // This is a public URL, never an AI key. Local development uses CONVEX_URL.
  define:{__CONVEX_URL__:JSON.stringify(env.VITE_CONVEX_URL || env.CONVEX_URL || "")},
  plugins:[{
   name:"development-state-preview-index",
   configureServer(server){
    server.middlewares.use((req,res,next)=>{
     if(req.url?.split("?")[0]!=="/state-preview")return next();
     res.setHeader("Content-Type","text/html; charset=utf-8");
     res.end(`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Practice state previews</title><style>body{font:18px/1.5 sans-serif;color:#17211b;background:white;margin:24px}a{color:#17211b;display:flex;align-items:center;min-height:48px;margin:8px 0}h1{font-size:28px}</style><h1>Practice state previews</h1><p>Prepared examples. These links do not use AI credits or change your saved practice.</p>${previewNames.map(name=>`<a href="/?preview=${name}">${name.replaceAll("-"," ")}</a>`).join("")}<a href="/">Live practice</a></html>`);
    });
   }
  }]
 };
});
