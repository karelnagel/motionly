import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { ReqRes } from "../../../types";
import { PostNewTemplateInput, PostNewTemplateOutput } from "@asius/sdk";
import { getServerSession } from "../../../lib/getServerSession";

export default async function NewTemplate(req: NextApiRequest, res: NextApiResponse) {
    let result = null
    if (req.method === "POST") result = postNewTemplate(req.body, { req, res })
    if (!result) return res.status(404).end
    return res.status(200).json(result)
}

const postNewTemplate = async (input: PostNewTemplateInput, reqRes?: ReqRes): Promise<PostNewTemplateOutput | null> => {
    const session = await getServerSession(reqRes);
    const result = await prisma.template.create({
        data: {
            ...input,
            comps: JSON.stringify(input.comps),
            user: { connect: { email: session?.user?.email || undefined } }
        }
    })
    return { ...result, comps: JSON.parse(result.comps) }
}