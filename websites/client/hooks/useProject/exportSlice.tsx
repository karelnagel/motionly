import { TemplateType } from "@motionly/base";
import { GetType, SetType } from ".";
import { trpcClient } from "../../app/ClientProvider";
import { RenderProgress } from "../../types";

type Render = Partial<RenderProgress> & {
  startTime: number;
  type: "media" | "still";
};

export interface ExportSlice {
  renders: { [id: string]: Render };
  allRenders: string[];
  renderId?: string;
  isRendering: boolean;
  renderMedia: (template: TemplateType) => Promise<void>;
  renderStill: (template: TemplateType, frame?: number) => Promise<void>;
  getProgress: () => Promise<void>;
}

export const exportSlice = (set: SetType, get: GetType): ExportSlice => {
  return {
    renders: {},
    allRenders: [],
    isRendering: false,
    renderMedia: async (template: TemplateType) => {
      if (get().isRendering) return;
      set({ isRendering: true });
      const {renderId} = await trpcClient.render.media.mutate({ template });
      set((s) => {
        if (!renderId) {
          return;
        }
        s.renderId = renderId;
        s.renders[renderId] = {
          renderId,
          status: "rendering",
          type: "media",
          startTime: new Date().getTime(),
        };
        s.allRenders.push(renderId);
      });
      const timeout = () =>
        setTimeout(async () => {
          await get().getProgress();
          if (get().isRendering) timeout();
        }, 2000);
      timeout();
    },
    renderStill: async (template: TemplateType) => {
      if (get().isRendering) return;
      set({ isRendering: true });
      const res = await trpcClient.render.still.mutate({
        template,
        frame: get().playerFrame,
      });
      if (!res) return;

      set((s) => {
        s.renderId = res.renderId;
        s.isRendering = false;
        s.renders[res.renderId] = {
          type: "still",
          startTime: new Date().getTime(),
          ...res,
        };
        s.allRenders.push(res.renderId);
      });
    },
    getProgress: async () => {
      const { renderId } = get();
      if (!renderId) return;
      const res = await trpcClient.render.progress.mutate({renderId});
      if (!res) return;

      set((s) => {
        if (res.status!=="rendering") s.isRendering = false;
        s.renders[renderId] = { ...s.renders[renderId], ...res };
      });
    },
  };
};
