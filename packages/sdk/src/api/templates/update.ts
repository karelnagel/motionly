import { TemplateType } from "@asius/types"
import axios from "axios"
import { BASE_URL } from "../../consts"

export type UpdateTemplateInput = {
    id: string
    template: TemplateType
}
export type UpdateTemplateOutput = TemplateType
export const updateTemplate = async ({ id, template }: UpdateTemplateInput): Promise<UpdateTemplateOutput | null> => {
    try {
        const result = await axios.put(`${BASE_URL}/api/templates/${id}`, template)
        return result.data
    } catch (e) {
        return null
    }
}
