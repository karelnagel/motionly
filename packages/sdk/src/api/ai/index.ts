import { ComponentProps } from "@asius/components";
import axios from "axios";

export const postAI = async (
  comps: ComponentProps[],
  prompt: string
): Promise<ComponentProps[] | null> => {
  try {
    const result = await axios.post("/api/ai", { comps, prompt });
    return result.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
