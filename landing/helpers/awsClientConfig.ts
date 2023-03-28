import { env } from "../env.mjs";

export const awsClientConfig = {
  region: env.REMOTION_AWS_REGION,
  credentials: {
    accessKeyId: env.REMOTION_AWS_ACCESS_KEY_ID,
    secretAccessKey: env.REMOTION_AWS_SECRET_ACCESS_KEY,
  },
  signatureVersion: "v4",
};
