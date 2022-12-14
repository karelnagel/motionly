import { DeleteTemplateInput, DeleteTemplateOutput, GetTemplateInput, GetTemplateOutput, UpdateTemplateInput, UpdateTemplateOutput } from "@asius/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function Template(req: NextApiRequest, res: NextApiResponse<any>) {
    let result = null
    const id = req.query.id as string
    if (req.method === "GET") result = await getTemplate({ id })
    else if (req.method === "PUT") result = await updateTemplate({ id, template: req.body })
    else if (req.method === "DELETE") result = await deleteTemplate({ id })

    if (!result) return res.status(404).end()
    return res.status(200).json(result)
}


export const getTemplate = async ({ id }: GetTemplateInput): Promise<GetTemplateOutput | null> => {
    const template = await prisma.template.findUnique({ where: { id }, include: { user: true } })
    if (!template) return null
    const { width, height, duration, name, description, comps, fps } = template
    return { comps: JSON.parse(comps), width, height, name, description, id, duration, fps, public: template.public }
}

const updateTemplate = async ({ id, template }: UpdateTemplateInput): Promise<UpdateTemplateOutput | null> => {
    const { comps, ...result } = await prisma.template.update({
        where: { id },
        data: {
            comps: JSON.stringify(template.comps),
            width: template.width,
            height: template.height,
            name: template.name,
            public: template.public,
            description: template.description
        }
    })
    return { ...result, comps: JSON.parse(comps) }
}

const deleteTemplate = async ({ id }: DeleteTemplateInput): Promise<DeleteTemplateOutput | null> => {
    const { comps, ...result } = await prisma.template.delete({ where: { id } })

    return { ...result, comps: JSON.parse(comps) }
}