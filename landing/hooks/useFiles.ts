import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { MediaType } from "../types";

type FileStore = {
  setMediaType: (tab: MediaType) => void;
  mediaType: MediaType;
};

export const useFiles = create(
  persist(
    immer<FileStore>((set, get) => ({
      mediaType: "VIDEO",
      setMediaType: (tab) =>
        set((s) => {
          s.mediaType = tab;
        }),
    })),
    { name: "media" }
  )
);
