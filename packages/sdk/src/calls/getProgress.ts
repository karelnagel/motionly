import { BASE_URL } from "../consts"
import axios from "axios"
import { GetProgressInput, GetProgressOutput } from "@asius/types"

export const getProgress = async (props: GetProgressInput): Promise<GetProgressOutput> => {
    const result = await axios.get(`${BASE_URL}/api/progress/`, { params: { "apiKey": process.env.ASIUS_API_KEY, ...props } })
    return result.data
}