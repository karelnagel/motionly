export const functionName = process.env.REMOTION_FUNCTION_NAME || "";
export const awsAccessKeyId = process.env.REMOTION_AWS_ACCESS_KEY_ID || "";
export const awsSecretAccessKey =
  process.env.REMOTION_AWS_SECRET_ACCESS_KEY || "";
export const bucketName = process.env.NEXT_PUBLIC_REMOTION_BUCKET || "";
export const region = process.env.NEXT_PUBLIC_REMOTION_REGION as any;
export const serveUrl = process.env.NEXT_PUBLIC_SERVE_URL || "";
export const composition = "Main";

export const asiusUrl = process.env.NEXT_PUBLIC_ASIUS_URL || "";
export const apiUrl = process.env.NEXT_PUBLIC_ASIUS_API_URL || "";
export const url = process.env.NEXT_PUBLIC_URL || "";
