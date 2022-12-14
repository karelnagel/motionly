import { BASE_URL } from "../../consts"
import axios from "axios"
import { ProgressStatus, VideoInput } from "@asius/types"

export type RenderImageInput = VideoInput & { frame: number }
export type RenderImageOutput = {
    fileUrl: string
    cost: number
    status: ProgressStatus
}
export const renderImage = async (props: RenderImageInput): Promise<RenderImageOutput> => {
    const result = await axios.post(`${BASE_URL}/api/render-image/`, props, { params: { "apiKey": process.env.ASIUS_API_KEY } })
    return result.data
}
