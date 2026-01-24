import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {

  },

  clientPrefix: "VITE_PUBLIC_",
  client: {
    VITE_PUBLIC_API_URL: z.url(),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    VITE_PUBLIC_API_URL: import.meta.env.VITE_PUBLIC_API_URL,
  },
  emptyStringAsUndefined: true
});