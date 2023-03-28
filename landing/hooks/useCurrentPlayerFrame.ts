import { useEffect } from "react";
import { useProject } from "./useProject";

export const useCurrentPlayerFrame = () => {
  const setFrame = useProject((s) => s.playerSetFrame);
  const ref = useProject((s) => s.playerRef);
  const setIsPlaying = useProject((s) => s.playerSetIsPlaying);

  useEffect(() => {
    if (!ref) return;
    ref.addEventListener("play", () => {
      setIsPlaying(true);
    });
    ref.addEventListener("pause", () => {
      setIsPlaying(false);
    });
    ref.addEventListener("frameupdate", ({ detail }) => {
      setFrame(detail.frame);
    });
  }, [ref]);
};
