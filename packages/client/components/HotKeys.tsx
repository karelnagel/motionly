import { PlayerRef } from "@remotion/player";
import { RefObject, useCallback, useEffect } from "react";
import { useCurrentPlayerFrame } from "../hooks/useCurrentPlayerFrame";

export function HotKeys({
  copy,
  remove,
  undo,
  redo,
  setSelected,
  playerRef,
  fps,
}: {
  copy?: () => void;
  remove?: () => void;
  undo?: () => void;
  redo?: () => void;
  setSelected?: (s: string) => void;
  playerRef: RefObject<PlayerRef>;
  fps: number;
}) {
  const frame = useCurrentPlayerFrame(playerRef);
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const isInput =
        (document.activeElement?.tagName === "INPUT" ||
          document.activeElement?.tagName === "TEXTAREA") &&
        document.activeElement?.id !== "timeline";
      if (event.key === "Backspace" && !isInput) {
        remove?.();
      } else if (event.key === "z" && event.metaKey && !event.shiftKey) {
        undo?.();
      } else if (event.key === "z" && event.metaKey && event.shiftKey) {
        redo?.();
      } else if (event.key === "c" && event.metaKey && !isInput) {
        copy?.();
      } else if (event.key === " " && !isInput) {
        playerRef.current?.toggle();
      } else if (
        (event.key === "l" || event.key === "ArrowRight") &&
        !isInput
      ) {
        playerRef.current?.seekTo(frame + 5 * fps);
      } else if ((event.key === "j" || event.key === "ArrowLeft") && !isInput) {
        playerRef.current?.seekTo(frame - 5 * fps);
      } else if (event.key === "m" && !isInput) {
        playerRef.current?.isMuted()
          ? playerRef.current?.unmute()
          : playerRef.current?.mute();
      } else if (event.key === "f" && !isInput) {
        playerRef.current?.isFullscreen()
          ? playerRef.current?.exitFullscreen()
          : playerRef.current?.requestFullscreen();
      } else if (event.key === "1" && !isInput) {
        setSelected?.("ai");
      } else if (event.key === "2" && !isInput) {
        setSelected?.("add");
      } else if (event.key === "3" && !isInput) {
        setSelected?.("template");
      } else if (event.key === "4" && !isInput) {
        setSelected?.("export");
      } else if (event.key === "0" && !isInput) {
        setSelected?.("");
      } else return;
      event.preventDefault();
    },
    [copy, remove, undo, redo, setSelected, playerRef, fps, frame]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [copy, remove, undo, redo, setSelected, playerRef, fps, frame]);

  return null;
}
