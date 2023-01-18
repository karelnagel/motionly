import axios from "axios";

export const startTranscription = async (
  key: string,
  url: string
): Promise<string | null> => {
  try {
    const result = await axios.post("/api/media/transcriptions", { key, url });
    return result.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
