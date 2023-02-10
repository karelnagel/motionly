import axios from "axios";
import { UserFile } from "../../hooks/useFiles";

export const getMedia = async (): Promise<UserFile[] | null> => {
  try {
    const response = await axios.get(`/api/media/`);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
