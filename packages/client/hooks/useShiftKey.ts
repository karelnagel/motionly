import { useEffect, useState } from "react";

export function useShiftKey() {
  const [shiftHeld, setShiftHeld] = useState(false);

  function downHandler({ key }: { key: string }) {
    if (key === "Shift") {
      setShiftHeld(true);
    }
  }

  function upHandler({ key }: { key: string }) {
    if (key === "Shift") {
      setShiftHeld(false);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);
  return shiftHeld;
}
