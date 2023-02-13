import { generateOpenApiDocument } from "trpc-openapi";
import { env } from "../env.mjs";

import { appRouter } from "./api/root";

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "tRPC OpenAPI",
  version: "1.0.0",
  baseUrl: `${env.NEXTAUTH_URL}/api/`,
});
