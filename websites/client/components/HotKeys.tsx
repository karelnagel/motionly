import { useCallback, useEffect } from "react";
import { useCurrentPlayerFrame } from "../hooks/useCurrentPlayerFrame";
import { useProject } from "../hooks/useProject";

export function HotKeys() {
  useCurrentPlayerFrame();

  const undo = useProject((t) => t.undo);
  const redo = useProject((t) => t.redo);
  const setSelected = useProject((t) => t.setSelected);
  const deleteComp = useProject((t) => t.deleteComp);
  const copyComp = useProject((t) => t.copyComp);
  const fps = useProject((t) => t.project.template.fps);
  const playerRef = useProject((t) => t.playerRef);
  const frame = useProject((t) => t.playerFrame);
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const isInput =
        (document.activeElement?.tagName === "INPUT" ||
          document.activeElement?.tagName === "TEXTAREA") &&
        document.activeElement?.id !== "timeline";
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
      } else if (
        (event.key === "l" || event.key === "ArrowRight") &&
        !isInput
      ) {
        playerRef?.seekTo(frame + 5 * fps);
      } else if ((event.key === "j" || event.key === "ArrowLeft") && !isInput) {
        playerRef?.seekTo(frame - 5 * fps);
      } else if (event.key === "m" && !isInput) {
        playerRef?.isMuted() ? playerRef?.unmute() : playerRef?.mute();
      } else if (event.key === "f" && !isInput) {
        playerRef?.isFullscreen()
          ? playerRef?.exitFullscreen()
          : playerRef?.requestFullscreen();
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
