import { generateOpenApiDocument } from "trpc-openapi";

import { appRouter } from "./api/root";

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Motionly API",
  docsUrl: "/docs",
  version: "1.0.0",
  baseUrl: `/api`,
  description:
    "For private API endpoints go get an API key from your account settings page and use it here.",
});
