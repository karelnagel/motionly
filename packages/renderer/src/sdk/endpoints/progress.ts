import axios from "axios";
import { ProgressStatus } from "@motionly/base";
import { baseUrl } from "../../env";

export type GetProgressInput = { renderId: string };
export type GetProgressOutput = {
  progress: number;
  cost: number;
  status: ProgressStatus;
  fileUrl: string;
};
export const getProgress = async ({
  renderId,
}: GetProgressInput): Promise<GetProgressOutput | null> => {
  try {
    const result = await axios.get(`${baseUrl}/api/remotion/progress/`, {
      params: { renderId },
    });
    return result.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
