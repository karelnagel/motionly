import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function Update(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;
    const session = await unstable_getServerSession(req, res, authOptions)
    const template = await prisma.template.findUnique({ where: { id }, include: { user: true } })

    if (req.method === "GET") {
        if (req.query.password !== process.env.NEXTAUTH_SECRET) return res.status(400).end() //Only accessible from image api
        const result = await prisma.template.findUnique({
            where: { id }
        })
        if (!result) return res.status(404).end();
        return res.status(200).json({ width: result.width, height: result.height, elements: result.elements })
    }

    else if (req.method === "PUT") {
        if (template?.user.email !== session?.user?.email) return res.status(400).end()
        const result = await prisma.template.update({
            where: { id },
            data: {
                elements: req.body.elements,
                width: req.body.width,
                height: req.body.height,
                name: req.body.name,
                public: req.body.public,
                description: req.body.description
            }
        })

        return res.status(200).json({ ...result })
    }

    else if (req.method === "DELETE") {
        if (template?.user.email !== session?.user?.email) return res.status(400).end()
        const result = await prisma.template.delete({ where: { id } })

        return res.status(200).end()
    }

    else
        return res.status(405).end();
}