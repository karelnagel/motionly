import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../server/auth";
import { ReqRes, SessionWithId } from "../types";

export const getServerSession = async (
  reqRes?: ReqRes
): Promise<SessionWithId> => {
  if (reqRes)
    return (await unstable_getServerSession(
      reqRes.req,
      reqRes.res,
      authOptions
    )) as SessionWithId;
  return (await unstable_getServerSession(authOptions)) as SessionWithId;
};
