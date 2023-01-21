import { baseUrl } from "../../consts";
import axios from "axios";
import { MediaProps } from "@asius/base";

export type RenderMediaInput = MediaProps;
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
