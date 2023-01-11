import { useCallback, useEffect } from "react";

export function useKeys({
  copy,
  remove,
  undo,
  redo,
  play,
  forwards,
  backwards,
  setSelected,
  mute,
  fullscreen,
}: {
  copy?: () => void;
  remove?: () => void;
  undo?: () => void;
  redo?: () => void;
  play?: () => void;
  forwards?: () => void;
  backwards?: () => void;
  mute?: () => void;
  fullscreen?: () => void;
  setSelected?: (s: string) => void;
}) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const isInput =
        document.activeElement?.tagName === "INPUT" &&
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
        play?.();
      } else if (
        (event.key === "l" || event.key === "ArrowRight") &&
        !isInput
      ) {
        forwards?.();
      } else if ((event.key === "j" || event.key === "ArrowLeft") && !isInput) {
        backwards?.();
      } else if (event.key === "m" && !isInput) {
        mute?.();
      } else if (event.key === "f" && !isInput) {
        fullscreen?.();
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
    [remove, undo, redo, copy, play]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [remove, undo, redo, copy, play]);

  return;
}
