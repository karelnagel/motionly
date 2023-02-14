import crypto from "crypto";

export const hashString = (str: string) =>
  crypto.createHash("md5").update(str).digest("hex");
