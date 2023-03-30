import { useCallback, useEffect } from "react";
import { useCurrentPlayerFrame } from "../hooks/useCurrentPlayerFrame";
import { useStore } from "../store";

export function HotKeys() {
  useCurrentPlayerFrame();

  const undo = useStore((t) => t.undo);
  const redo = useStore((t) => t.redo);
  const setSelected = useStore((t) => t.setComponent);
  const deleteComp = useStore((t) => t.deleteComp);
  const copyComp = useStore((t) => t.copyComponent);
  const fps = useStore((t) => t.templates[t.template].fps);
  const playerRef = useStore((t) => t.playerRef);
  const frame = useStore((t) => t.frame);
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const isInput =
        (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") && document.activeElement?.id !== "timeline";
      if (event.key === "Backspace" && !isInput) {
        deleteComp();
      } else if (event.key === "z" && event.metaKey && !event.shiftKey) {
        undo?.();
      } else if (event.key === "z" && event.metaKey && event.shiftKey) {
        redo?.();
      } else if (event.key === "c" && event.metaKey && !isInput) {
        copyComp();
      } else if (event.key === " " && !isInput) {
        playerRef?.toggle();
      } else if ((event.key === "l" || event.key === "ArrowRight") && !isInput) {
        playerRef?.seekTo(frame + 5 * fps);
      } else if ((event.key === "j" || event.key === "ArrowLeft") && !isInput) {
        playerRef?.seekTo(frame - 5 * fps);
      } else if (event.key === "m" && !isInput) {
        playerRef?.isMuted() ? playerRef?.unmute() : playerRef?.mute();
      } else if (event.key === "f" && !isInput) {
        playerRef?.isFullscreen() ? playerRef?.exitFullscreen() : playerRef?.requestFullscreen();
      } else if (event.key === "1" && !isInput) {
        setSelected("ai");
      } else if (event.key === "2" && !isInput) {
        setSelected("add");
      } else if (event.key === "3" && !isInput) {
        setSelected("template");
      } else if (event.key === "4" && !isInput) {
        setSelected("export");
      } else if (event.key === "0" && !isInput) {
        setSelected("");
      } else return;
      event.preventDefault();
    },
    [undo, redo, setSelected, playerRef, fps, frame, deleteComp, copyComp]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [copyComp, deleteComp, undo, redo, setSelected, playerRef, fps, frame]);

  return null;
}
