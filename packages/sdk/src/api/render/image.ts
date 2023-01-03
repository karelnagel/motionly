import { baseUrl } from "../../consts";
import axios from "axios";
import { ProgressStatus, VideoInput } from "@asius/components";

export type RenderStillInput = VideoInput & { frame: number };
export type RenderStillOutput = {
  fileUrl: string;
  cost: number;
  status: ProgressStatus;
  renderId: string;
};
export const renderStill = async (
  props: RenderStillInput
): Promise<RenderStillOutput | null> => {
  try {
    const result = await axios.post(`${baseUrl}/api/render/still/`, props);
    return result.data;
  }
  catch (e) {
    console.log(e)
    return null;
  }
};
