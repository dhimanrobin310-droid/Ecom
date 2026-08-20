# Multicart deployment

This repository deploys as one Vercel project: Vite serves the React app and
`/api/*` is handled by the Express serverless function.

Before deploying, create the variables in [`.env.example`](.env.example) in
your Vercel project settings:

- `MONGODB_URI` — a MongoDB Atlas connection string (do not use localhost).
- `JWT_SECRET` — a long, private random value.
- `BLOB_READ_WRITE_TOKEN` — the token for a Vercel Blob store; required for
  category, brand, and product image uploads.

In Vercel, set the project Root Directory to `Ecom` if you import this parent
repository. The build command is `npm run build` and the output directory is
`dist`; both are also defined in `vercel.json`.

For local development, run the API from `backend` on port 9000 and `npm run dev`
from this directory. Vite proxies `/api` requests to that API.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
