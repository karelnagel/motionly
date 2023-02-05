import { Components } from "@motionly/base";
import axios from "axios";

export const postAI = async (
  comps: Components,
  prompt: string
): Promise<Components | null> => {
  try {
    const result = await axios.post("/api/ai", { comps, prompt });
    return result.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
