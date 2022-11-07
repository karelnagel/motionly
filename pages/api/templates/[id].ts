import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/client";

export default async function Update(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;

    if (req.method === "GET") {
        const result = await prisma.template.findUnique({
            where: { id }
        })
        if (!result) return res.status(404).end();
        return res.status(200).json({ width: result.width, height: result.height, elements: result.elements })
    }

    else if (req.method === "PUT") {

        const result = await prisma.template.update({
            where: { id },
            data: {
                elements: req.body.elements,
                width: req.body.width,
                height: req.body.height,
                name: req.body.name,
                description: req.body.description
            }
        })

        return res.status(200).json({ ...result })
    }

    else
        return res.status(405).end();
}