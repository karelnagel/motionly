import axios from "axios";
import { trpcClient } from "../app/ClientProvider";
import { UserFile } from "../server/api/routers/media/media";

export const uploadMedia = async (file: File): Promise<UserFile | null> => {
  try {
    if (!file) return null;

    const { signedUrl, id } = await trpcClient.media.new.mutate({
      name: file.name,
      type: file.type,
    });
    if (!signedUrl) return null;

    await axios.put(signedUrl, file);
    const uploadedFile = await trpcClient.media.verify.mutate({ id });
    return uploadedFile;
  } catch (e) {
    console.log(e);
    return null;
  }
};
