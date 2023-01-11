import { useCallback, useEffect } from "react";

export function useKeys({
  copy,
  remove,
  undo,
  redo,
  play,
  forwards,
  backwards,
}: {
  copy?: () => void;
  remove?: () => void;
  undo?: () => void;
  redo?: () => void;
  play?: () => void;
  forwards?: () => void;
  backwards?: () => void;
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
