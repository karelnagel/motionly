import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Update(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") res.status(405).end();
    const id = req.query.id as string;
    const result = await new PrismaClient().template.update({
        where: { id },
        data: {
            elements: req.body.elements,
            width: req.body.width,
            height: req.body.height,
            name: req.body.name,
            description: req.body.description
        }
    })

    res.status(200).json({ ...result })
}