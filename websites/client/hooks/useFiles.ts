import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { getFileType } from "../helpers/file";
import { deleteMedia } from "../sdk/media/delete";
import { getMedia } from "../sdk/media/get";
import { uploadMedia } from "../sdk/media/upload";

export type FileType = "image" | "video" | "gif" | undefined;
export type UserFile = {
  name: string;
  url: string;
  type: FileType;
};
type FileStore = {
  files: UserFile[];
  fetch: () => Promise<UserFile[] | null>;
  upload: (
    file: File,
    onChange?: (file: UserFile) => void
  ) => Promise<UserFile | null>;
  delete: (url: string) => Promise<"success" | null>;
};
export const useFiles = create(
  persist(
    immer<FileStore>((set, get) => ({
      files: [],
      fetch: async () => {
        const files = await getMedia();
        if (!files) return null;
        set((s) => {
          s.files = files;
        });
        return files;
      },
      upload: async (file, onChange) => {
        const blobUrl = URL.createObjectURL(file);
        const blob = {
          name: file.name,
          url: blobUrl,
          type: getFileType(file.name),
        };
        onChange?.(blob);
        const userFile = await uploadMedia(file);
        if (!userFile) return null;
        set((s) => {
          s.files = s.files.filter((f) => f.url !== blobUrl);
          s.files.push(userFile);
        });
        onChange?.(userFile);
        return userFile;
      },
      delete: async (url) => {
        const res = await deleteMedia(url);
        if (!res) return null;
        set((s) => {
          s.files = s.files.filter((f) => f.url !== url);
        });
        return res;
      },
    })),
    { name: "media" }
  )
);
