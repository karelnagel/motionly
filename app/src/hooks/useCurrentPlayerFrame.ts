import { useEffect } from "react";
import { useStore } from "../store";

export const useCurrentPlayerFrame = () => {
  const setFrame = useStore((s) => s.setFrame);
  const ref = useStore((s) => s.playerRef);
  const setIsPlaying = useStore((s) => s.setIsPlaying);

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
