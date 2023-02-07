import { useEffect } from "react";
import { usePlayer } from "./useProject/playerSlice";

export const useCurrentPlayerFrame = () => {
  const setFrame = usePlayer((s) => s.setFrame);
  const ref = usePlayer((s) => s.playerRef);
  const setIsPlaying = usePlayer((s) => s.setIsPlaying);

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
