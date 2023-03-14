import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { MediaType } from "../types";

type FileStore = {
  stockQuery: string;
  setMediaType: (tab: MediaType) => void;
  setStockQuery: (query: string) => void;
  mediaType: MediaType;
};

export const useFiles = create(
  persist(
    immer<FileStore>((set, get) => ({
      stockQuery: "",
      mediaType: "VIDEO",
      setMediaType: (tab) =>
        set((s) => {
          s.mediaType = tab;
        }),
      setStockQuery: (query) =>
        set((s) => {
          s.stockQuery = query;
        }),
    })),
    { name: "media" }
  )
);
