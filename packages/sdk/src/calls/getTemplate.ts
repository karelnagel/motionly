import { BASE_URL } from "../consts"
import axios from "axios"
import { GetTemplateInput, GetTemplateOutput } from "@asius/types"

export const getTemplate = async (props: GetTemplateInput): Promise<GetTemplateOutput> => {
    const result = await axios.get(`${BASE_URL}/api/templates/${props.id}`, { params: { "apiKey": process.env.ASIUS_API_KEY } })
    return result.data
}