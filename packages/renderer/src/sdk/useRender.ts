import { ProgressStatus } from "@motionly/base";
import { useEffect, useState } from "react";
import { renderStill, RenderStillInput } from "./endpoints/still";
import { getProgress as getProgressSdk } from "./endpoints/progress";
import { renderMedia } from "./endpoints/media";

export const useRender = (
  videoInput: RenderStillInput,
  refreshInterval = 1000
) => {
  const [renderId, setRenderId] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [progress, setProgress] = useState<number>();
  const [cost, setCost] = useState(0);
  const [status, setStatus] = useState<ProgressStatus>();

  useEffect(() => {
    if (!renderId || !refreshInterval || status !== "rendering") return;

    const interval = setInterval(getProgress, refreshInterval);
    return () => clearInterval(interval);
  }, [renderId, refreshInterval, status]);

  const init = () => {
    setRenderId("");
    setProgress(undefined);
    setCost(0);
    setFileUrl("");
    setStatus("rendering");
  };
  const media = async () => {
    init();
    const result = await renderMedia(videoInput);
    if (!result) return setStatus("error");
    setRenderId(result.renderId);
  };
  const getProgress = async () => {
    const result = await getProgressSdk({ renderId });
    if (!result) return setStatus("error");

    setCost(result.cost);
    setStatus(result.status);
    setProgress(result.progress);
    setFileUrl(result.fileUrl);
  };
  const still = async () => {
    init();
    const result = await renderStill(videoInput);
    if (!result) return setStatus("error");

    setCost(result.cost);
    setStatus(result.status);
    setProgress(1);
    setRenderId(result.renderId);
    setFileUrl(result.fileUrl);
  };
  return {
    still,
    media,
    getProgress,
    renderId,
    progress,
    cost,
    status,
    fileUrl,
  };
};
