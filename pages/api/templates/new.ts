import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { DEFAULT_ELEMENTS } from "../../../types/defaults";

export default async function New(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") res.status(405).end();
    const result = await new PrismaClient().template.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            width: 1080,
            height: 1080,
            elements: JSON.stringify(DEFAULT_ELEMENTS),

        }
    })
    res.status(200).json({ ...result })
}