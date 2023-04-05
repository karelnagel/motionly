import { useCallback, useEffect } from "react";
import { useCurrentPlayerFrame } from "../hooks/useCurrentPlayerFrame";
import { usePlayerRef, usePlayerStore, useTemplate, useTemplateStore } from "../store";

export function HotKeys() {
  useCurrentPlayerFrame();

  const undo = useTemplateStore((t) => t.undo);
  const redo = useTemplateStore((t) => t.redo);
  const setSelected = useTemplateStore((t) => t.setComponent);
  const deleteComp = useTemplateStore((t) => t.deleteComp);
  const copyComp = useTemplateStore((t) => t.copyComponent);
  const fps = useTemplate((t) => t.fps);
  const playerRef = usePlayerRef();
  const frame = usePlayerStore((t) => t.frame);
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const isInput = document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA";
      const isTextInput = isInput && document.activeElement?.getAttribute("type") === "text";
      if (event.key === "Backspace" && !isInput) {
        deleteComp();
      } else if (event.key === "z" && event.metaKey && !event.shiftKey) {
        undo?.();
      } else if (event.key === "z" && event.metaKey && event.shiftKey) {
        redo?.();
      } else if (event.key === "c" && event.metaKey && !isInput) {
        copyComp();
      } else if (event.key === " " && !isTextInput) {
        playerRef?.toggle();
      } else if ((event.key === "l" || event.key === "ArrowRight") && !isInput) {
        playerRef?.seekTo(frame + 5 * fps);
      } else if ((event.key === "j" || event.key === "ArrowLeft") && !isInput) {
        playerRef?.seekTo(frame - 5 * fps);
      } else if (event.key === "m" && !isInput) {
        playerRef?.isMuted() ? playerRef?.unmute() : playerRef?.mute();
      } else if (event.key === "f" && !isInput) {
        playerRef?.isFullscreen() ? playerRef?.exitFullscreen() : playerRef?.requestFullscreen();
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
