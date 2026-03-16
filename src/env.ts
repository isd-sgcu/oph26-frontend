import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    GOOGLE_CLIENT_SECRET: z.string(),
  },

  clientPrefix: 'VITE_PUBLIC_',
  client: {
    VITE_PUBLIC_API_URL: z.url(),
    VITE_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
    VITE_PUBLIC_GOOGLE_PROJECT_ID: z.string(),
    VITE_PUBLIC_GOOGLE_AUTH_URI: z.string(),
    VITE_PUBLIC_GOOGLE_TOKEN_URI: z.string(),
    VITE_PUBLIC_GOOGLE_AUTH_PROVIDER_X509_CERT_URL: z.string(),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    VITE_PUBLIC_API_URL: import.meta.env.VITE_PUBLIC_API_URL,
    VITE_PUBLIC_GOOGLE_CLIENT_ID: import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID,
    VITE_PUBLIC_GOOGLE_PROJECT_ID: import.meta.env
      .VITE_PUBLIC_GOOGLE_PROJECT_ID,
    VITE_PUBLIC_GOOGLE_AUTH_URI: import.meta.env.VITE_PUBLIC_GOOGLE_AUTH_URI,
    VITE_PUBLIC_GOOGLE_TOKEN_URI: import.meta.env.VITE_PUBLIC_GOOGLE_TOKEN_URI,
    VITE_PUBLIC_GOOGLE_AUTH_PROVIDER_X509_CERT_URL: import.meta.env
      .VITE_PUBLIC_GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
  },
  emptyStringAsUndefined: true,
})
