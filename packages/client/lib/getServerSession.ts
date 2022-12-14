import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import { ReqRes } from "../types"

export const getServerSession = async (reqRes?: ReqRes) => {
    if (reqRes) return await unstable_getServerSession(reqRes.req, reqRes.res, authOptions)
    return await unstable_getServerSession(authOptions)
}