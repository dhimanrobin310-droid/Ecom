// In development mode, default to "" so requests are proxied via Vite (avoiding browser CORS errors).
// In production mode (e.g. Vercel), default to the deployed Render backend URL.
export const API_BASE_URL = import.meta.env.VITE_API_URL 
  || (import.meta.env.DEV ? "" : "https://ecom-1hqx.onrender.com");

export const API_URL = API_BASE_URL;
