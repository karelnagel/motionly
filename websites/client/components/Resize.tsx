import { useCallback, useEffect, useState } from "react";

export const Resize = ({
  value,
  setValue,
  isHorizontal = false,
}: {
  value: number;
  setValue: (w: number) => void;
  isHorizontal?: boolean;
}) => {
  const [isResizing, setIsResizing] = useState(false);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) {
        return;
      }
      setValue(value - (isHorizontal ? e.movementY : e.movementX));
    },
    [isResizing, value]
  );

  const onMouseDown = useCallback(() => {
    setIsResizing(true);
  }, []);

  const onMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [isResizing, onMouseMove, onMouseUp]);

  return (
    <div
      onMouseDown={onMouseDown}
      className={` ${
        isHorizontal
          ? "w-full h-1 cursor-ns-resize"
          : " h-full w-1 cursor-ew-resize"
      } hover:bg-primary absolute left-0 top-0 select-none `}
    />
  );
};
