import { baseUrl } from "../../consts";
import axios from "axios";
import { VideoInput } from "@asius/components";

export type RenderMediaInput = VideoInput;
export type RenderMediaOutput = { renderId: string };

export const renderMedia = async (
  props: RenderMediaInput
): Promise<RenderMediaOutput | null> => {
  try {
    const result = await axios.post(`${baseUrl}/api/render/media/`, props);
    return result.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
