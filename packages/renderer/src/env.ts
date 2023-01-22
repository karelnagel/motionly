export const baseUrl = process.env.NEXT_PUBLIC_REMOTION_API_URL || "";
export const bucketName = process.env.REMOTION_BUCKET || "";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const region = process.env.REMOTION_REGION as any;
export const serveUrl = process.env.REMOTION_SERVE_URL || "";
export const functionName = process.env.REMOTION_FUNCTION_NAME || "";
export const composition = "Main";
