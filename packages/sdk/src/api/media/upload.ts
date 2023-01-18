import axios from "axios";

export const uploadMedia = async (file: File): Promise<string | null> => {
  try {
    if (!file) return null;
    const response = await axios.post("/api/media/signed-url", {
      name: file.name,
      type: file.type,
    });
    const { url, key } = response.data;
    await axios.put(url, file);
    return key;
  } catch (e) {
    console.log(e);
    return null;
  }
};
