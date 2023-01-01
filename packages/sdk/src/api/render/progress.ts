import { baseUrl } from "../../consts";
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
  { renderId }: GetProgressInput
): Promise<GetProgressOutput | null> => {
  try {
    const result = await axios.get(`${baseUrl}/api/render/progress/`, {
      params: { renderId },
    });
    return result.data;
  }
  catch (e) {
    console.log(e)
    return null;
  }
}
