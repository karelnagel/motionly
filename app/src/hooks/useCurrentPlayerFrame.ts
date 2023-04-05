import { useEffect } from "react";
import { usePlayerRef, usePlayerStore } from "../store";

export const useCurrentPlayerFrame = () => {
  const setFrame = usePlayerStore((s) => s.setFrame);
  const ref = usePlayerRef();
  const setIsPlaying = usePlayerStore((s) => s.setIsPlaying);

  useEffect(() => {
    if (!ref) return;
    ref.addEventListener?.("play", () => {
      setIsPlaying(true);
    });
    ref.addEventListener?.("pause", () => {
      setIsPlaying(false);
    });
    ref.addEventListener?.("frameupdate", ({ detail }) => {
      setFrame(detail.frame);
    });
  }, [ref]);
};
