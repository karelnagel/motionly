import axios from "axios";

export const getMedia = async (
  type: "video" | "image" | "gif"
): Promise<string[] | null> => {
  try {
    const response = await axios.get(`/api/media/`, { params: { type } });
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
