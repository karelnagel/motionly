import { useCallback, useEffect, useState } from "react";

export const Resize = ({
  value,
  setValue,
  isHorizontal = false,
  className,
  reverse,
}: {
  value: number;
  setValue: (w: number) => void;
  isHorizontal?: boolean;
  className?: string;
  reverse?: boolean;
}) => {
  const [isResizing, setIsResizing] = useState(false);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) {
        return;
      }
      setValue(
        value - (isHorizontal ? e.movementY : e.movementX) * (reverse ? -1 : 1)
      );
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
      } hover:bg-primary absolute select-none ${
        !reverse ? "top-0 left-0" : "bottom-0 right-0"
      } ${className}`}
    />
  );
};
