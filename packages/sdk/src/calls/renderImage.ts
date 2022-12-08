import { BASE_URL } from "../consts"
import axios from "axios"
import { RenderImageInput, RenderImageOutput } from "@asius/types"

export const renderImage = async (props: RenderImageInput): Promise<RenderImageOutput> => {
    const result = await axios.post(`${BASE_URL}/api/render-image/`, props, { params: { "apiKey": process.env.ASIUS_API_KEY } })
    return result.data
}
