import { BASE_URL } from "../consts"
import axios from "axios"
import { RenderVideoInput, RenderVideoOutput } from "@asius/types"

export const renderVideo = async (props: RenderVideoInput): Promise<RenderVideoOutput> => {
    const result = await axios.post(`${BASE_URL}/api/render-video/`, props, { params: { "apiKey": process.env.ASIUS_API_KEY } })
    return result.data
}
