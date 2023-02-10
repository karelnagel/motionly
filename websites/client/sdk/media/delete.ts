import axios from "axios";

export const deleteMedia = async (key: string): Promise<"success" | null> => {
  try {
    await axios.delete(`/api/media/`, { params: { key } });
    return "success";
  } catch (e) {
    console.log(e);
    return null;
  }
};
