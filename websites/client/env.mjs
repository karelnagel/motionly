/* eslint-disable @typescript-eslint/ban-ts-comment */
import { z } from "zod";

const server = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXTAUTH_SECRET:
    process.env.NODE_ENV === "production"
      ? z.string().min(1)
      : z.string().min(1).optional(),
  NEXTAUTH_URL: z.preprocess(
    (str) => process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : str,
    z.string().url(),
  ),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  REMOTION_AWS_FUNCTION_NAME: z.string(),
  REMOTION_AWS_ACCESS_KEY_ID: z.string(),
  REMOTION_AWS_SECRET_ACCESS_KEY: z.string(),
  REMOTION_AWS_REGION: z.string(),
  REMOTION_AWS_BUCKET: z.string(),
  REMOTION_AWS_SERVE_URL: z.string(),
  REMOTION_COMPOSITION: z.string(),
  MEDIA_BUCKET: z.string(),
  GIPHY_API_KEY: z.string(),
  PEXELS_API_KEY: z.string(),
  PIXABY_API_KEY: z.string(),
  OPENAI_API_KEY: z.string(),
});

const client = z.object({
  NEXT_PUBLIC_URL: z.string().min(1),
  NEXT_PUBLIC_EMAIL_ACCESS_KEY: z.string().min(1),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * edge runtimes (e.g. middlewares) or client-side so we need to destruct manually.
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  REMOTION_AWS_FUNCTION_NAME: process.env.REMOTION_AWS_FUNCTION_NAME,
  REMOTION_AWS_ACCESS_KEY_ID: process.env.REMOTION_AWS_ACCESS_KEY_ID,
  REMOTION_AWS_SECRET_ACCESS_KEY: process.env.REMOTION_AWS_SECRET_ACCESS_KEY,
  REMOTION_AWS_REGION: process.env.REMOTION_AWS_REGION,
  REMOTION_AWS_BUCKET: process.env.REMOTION_AWS_BUCKET,
  REMOTION_AWS_SERVE_URL: process.env.REMOTION_AWS_SERVE_URL,
  REMOTION_COMPOSITION: "Main",
  MEDIA_BUCKET: 'motionly-media',
  GIPHY_API_KEY: process.env.GIPHY_API_KEY,
  PEXELS_API_KEY: process.env.PEXELS_API_KEY,
  PIXABY_API_KEY: process.env.PIXABY_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_EMAIL_ACCESS_KEY: process.env.NEXT_PUBLIC_EMAIL_ACCESS_KEY,
};

const merged = server.merge(client);
/** @type z.infer<merged>
 *  @ts-ignore - can't type this properly in jsdoc */
let env = process.env;

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === "undefined";

  const parsed = isServer
    ? merged.safeParse(processEnv) // on server we can validate all env vars
    : client.safeParse(processEnv); // on client we can only validate the ones that are exposed

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment variables");
  }

  /** @type z.infer<merged>
   *  @ts-ignore - can't type this properly in jsdoc */
  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
        );
      /*  @ts-ignore - can't type this properly in jsdoc */
      return target[prop];
    },
  });
}

export { env };
