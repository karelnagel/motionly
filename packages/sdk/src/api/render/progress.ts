import { BASE_URL } from "../../consts";
import axios from "axios";
import { ProgressStatus } from "@asius/types";

export type GetProgressInput = { renderId: string };
export type GetProgressOutput = {
  progress: number;
  cost: number;
  status: ProgressStatus;
  fileUrl: string;
};
export const getRenderProgress = async (
  props: GetProgressInput
): Promise<GetProgressOutput> => {
  const result = await axios.get(`${BASE_URL}/api/progress/`, {
    params: { apiKey: process.env.ASIUS_API_KEY, ...props },
  });
  return result.data;
};
