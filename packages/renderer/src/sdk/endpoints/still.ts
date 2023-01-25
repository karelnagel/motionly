import { baseUrl } from "../../env";
import axios from "axios";
import { TemplateType, ProgressStatus } from "@motionly/base";

export type RenderStillInput = TemplateType & { frame: number };
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
    const result = await axios.post(`${baseUrl}/api/remotion/still/`, props);
    return result.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
