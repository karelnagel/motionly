import { Session, unstable_getServerSession } from "next-auth";
import { authOptions } from "../server/auth";
import { ReqRes } from "../types";

export const getServerSession = async (
  reqRes?: ReqRes
): Promise<Session | undefined> => {
  if (reqRes)
    return (
      (await unstable_getServerSession(reqRes.req, reqRes.res, authOptions)) ||
      undefined
    );
  return (await unstable_getServerSession(authOptions)) || undefined;
};
