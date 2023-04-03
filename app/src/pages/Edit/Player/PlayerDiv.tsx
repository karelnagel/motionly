import { ReactNode, useEffect, useRef } from "react";
import { useTemplateStore, useTemplate, usePlayerStore } from "../../../store";
import { Header } from "./Header";

export const PlayerDiv = ({ children }: { children: ReactNode }) => {
  const playerDivRef = useRef<HTMLDivElement>(null);
  const setScale = usePlayerStore((t) => t.playerSetScale);
  const template = useTemplate();
  const setComponent = useTemplateStore((t) => t.setComponent);
  const getScale = () => {
    if (playerDivRef.current?.clientHeight && playerDivRef.current?.clientWidth) {
      const scaleX = playerDivRef.current.clientWidth / template.width;
      const scaleY = playerDivRef.current.clientHeight / template.height;
      setScale(Math.min(scaleX, scaleY));
    }
  };
  useEffect(() => {
    new ResizeObserver(() => {
      getScale();
    }).observe(playerDivRef.current as Element);
    return () => {
      new ResizeObserver(() => {
        getScale();
      }).disconnect();
    };
  }, []);
  return (
    <div className="w-full relative h-full overflow-hidden flex flex-col">
      <Header />
      <div ref={playerDivRef} onClick={() => setComponent(undefined)} className="flex items-center justify-center h-full relative m-2 mt-0">
        <div className="absolute top-0 left-0 h-full w-full max-w-full flex items-center justify-center">{children}</div>
      </div>
    </div>
  );
};
