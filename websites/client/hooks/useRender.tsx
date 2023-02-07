import { ProgressStatus, TemplateType } from "@motionly/base";
import {
  GetProgressOutput,
  renderMedia as motionlyRenderMedia,
  renderStill as motionlyRenderStill,
  getProgress as motionlyGetProgress,
} from "@motionly/renderer/dist/sdk";
import { WritableDraft } from "immer/dist/internal";

type Render = Partial<GetProgressOutput> & {
  id: string;
  startTime: number;
  type: "media" | "still";
};

export interface RenderStore {
  renders: { [id: string]: Render };
  allRenders: string[];
  renderId?: string;
  status?: ProgressStatus;
  renderMedia: (template: TemplateType) => Promise<void>;
  renderStill: (template: TemplateType, frame?: number) => Promise<void>;
  getProgress: () => Promise<void>;
}

export const renderSlice = (
  set: (
    nextStateOrUpdater:
      | RenderStore
      | Partial<RenderStore>
      | ((state: WritableDraft<RenderStore>) => void),
    shouldReplace?: boolean | undefined
  ) => void,
  get: () => RenderStore
) => {
  return {
    renders: {},
    allRenders: [],
    renderMedia: async (template: TemplateType) => {
      if (get().status === "rendering") return;
      set({ status: "rendering" });
      const res = await motionlyRenderMedia(template);
      set((s) => {
        if (!res) {
          s.status = "error";
          return;
        }
        s.renderId = res.renderId;
        s.renders[res.renderId] = {
          id: res.renderId,
          type: "media",
          startTime: new Date().getTime(),
        };
        s.allRenders.push(res.renderId);
      });
      const timeout = () =>
        setTimeout(async () => {
          await get().getProgress();
          if (get().status === "rendering") timeout();
        }, 2000);
      timeout();
    },
    renderStill: async (template: TemplateType, frame: number = 0) => {
      if (get().status === "rendering") return;
      set({ status: "rendering" });
      const res = await motionlyRenderStill({ ...template, frame });
      set((s) => {
        if (!res) {
          s.status = "error";
          return;
        }
        s.renderId = res.renderId;
        s.status = "done";
        s.renders[res.renderId] = {
          id: res.renderId,
          type: "still",
          startTime: new Date().getTime(),
          progress: 1,
          ...res,
        };
        s.allRenders.push(res.renderId);
      });
    },
    getProgress: async () => {
      const { renderId } = get();
      if (!renderId) return;
      const res = await motionlyGetProgress({ renderId });
      set((s) => {
        if (!res) {
          s.status = "error";
          return;
        }
        s.status = res.status;
        s.renders[renderId] = { ...s.renders[renderId], ...res };
      });
    },
  };
};
