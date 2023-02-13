import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { StockResult } from "../server/api/routers/stock/sources";
import { MediaType } from "../types";
import { trpcClient } from "../app/ClientProvider";
import { UserFile } from "../server/api/routers/media";
import { uploadMedia } from "../helpers/uploadMedia";
import { getMediaType } from "../helpers/getMediaType";

type FileStore = {
  files: UserFile[];
  fetch: () => Promise<UserFile[] | null>;
  upload: (
    file: File,
    onChange?: (file: UserFile) => void
  ) => Promise<UserFile | null>;
  delete: (id: string) => Promise<"success" | null>;
  stockQuery: string;
  setStockQuery: (query: string) => void;
  stockMedia?: StockResult[];
  setStockMedia: (media?: StockResult[]) => void;
  mediaType: MediaType;
  setMediaType: (tab: MediaType) => void;
  fetchStock: () => Promise<StockResult[] | null>;
};

export const useFiles = create(
  persist(
    immer<FileStore>((set, get) => ({
      files: [],
      fetch: async () => {
        const { files } = await trpcClient.media.getAll.query({});
        if (!files) return null;
        set((s) => {
          s.files = files;
        });
        return files;
      },
      upload: async (file, onChange) => {
        const blobUrl = URL.createObjectURL(file);
        const blob: UserFile = {
          name: file.name,
          url: blobUrl,
          type: getMediaType(file.type) || "IMAGE",
          id: "",
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
      delete: async (id) => {
        const res = await trpcClient.media.delete.mutate({ id });
        if (!res) return null;
        set((s) => {
          s.files = s.files.filter((f) => f.id !== id);
        });
        return "success";
      },
      setStockQuery: (query) =>
        set((s) => {
          s.stockQuery = query;
        }),
      setStockMedia: (media?: StockResult[]) =>
        set((s) => {
          s.stockMedia = media;
        }),
      fetchStock: async () => {
        const { results } = await trpcClient.stock.get.query({
          type: get().mediaType,
          query: get().stockQuery || undefined,
        });
        if (!results) return null;
        set((s) => {
          s.stockMedia = results;
        });
        return results;
      },

      stockQuery: "",
      mediaType: "VIDEO",
      setMediaType: (tab) =>
        set((s) => {
          s.mediaType = tab;
        }),
    })),
    { name: "media" }
  )
);
