import axios from "axios";
import { getFileType } from "../../helpers/file";
import { UserFile } from "../../hooks/useFiles";

export type SignedUrl = {
  signedUrl: string;
  fileUrl: string;
};

const getSignedUrl = async (file: File): Promise<SignedUrl | null> => {
  try {
    const response = await axios.post("/api/media/signed-url", {
      name: file.name,
      type: file.type,
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const uploadMedia = async (file: File): Promise<UserFile | null> => {
  try {
    if (!file) return null;

    const response = await getSignedUrl(file);
    if (!response) return null;
    const { signedUrl, fileUrl } = response;

    await axios.put(signedUrl, file);
    return { name: file.name, url: fileUrl, type: getFileType(file.name) };
  } catch (e) {
    console.log(e);
    return null;
  }
};
