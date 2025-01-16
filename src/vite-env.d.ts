/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_NEWS_API_KEY: string,
    readonly VITE_NEWS_BASE_URL_SECRET: string,

    // Add other env variables here if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }