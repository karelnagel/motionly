import axios from "axios";
import { TemplateType } from "@asius/base";
import { baseUrl } from "../../env";

export type RenderMediaInput = TemplateType;
export type RenderMediaOutput = { renderId: string };

export const renderMedia = async (
  props: RenderMediaInput
): Promise<RenderMediaOutput | null> => {
  try {
    const result = await axios.post(`${baseUrl}/api/remotion/media/`, props);
    return result.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
