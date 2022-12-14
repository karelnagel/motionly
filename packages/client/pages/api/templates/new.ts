import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { defaultComponents } from "@asius/types";

export default async function New(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") res.status(405).end();
    const session = await unstable_getServerSession(req, res, authOptions);
    const duplicateId = req.body.duplicateId
    const duplicate = !duplicateId ? null : await prisma.template.findFirst({ where: { id: duplicateId, OR: [{ public: true }, { user: { email: session?.user?.email } }] } })
    const result = await prisma.template.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            width: duplicate?.width || 1080,
            height: duplicate?.height || 1080,
            duration: duplicate?.duration || 10,
            comps: duplicate?.comps || JSON.stringify(defaultComponents),
            user: { connect: { email: session?.user?.email || undefined } }
        }
    })
    res.status(200).json({ ...result })
}