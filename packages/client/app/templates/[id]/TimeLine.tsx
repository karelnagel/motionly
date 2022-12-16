import { CompProps, TemplateType } from "@asius/types";
import { PlayerRef } from "@remotion/player";
import { RefObject } from "react";

export const Timeline = ({
  selected,
  template,
  setSelected,
  setComp,
  playerRef,
  frame,
}: {
  selected: string;
  setSelected: (s: string) => void;
  setComp: (c: CompProps) => void;
  template: TemplateType;
  playerRef: RefObject<PlayerRef>;
  frame: number;
}) => {
  return (
    <div className="h-full w-full ">
      <div className="h-8 w-full relative">
        {new Array(template.duration * 2 + 1).fill(0).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 flex flex-col -translate-x-1/2 items-center"
            style={{ left: `${(i / 2 / template.duration) * 100}%` }}
          >
            <div className={`h-3  bg-black`} style={{ width: i % 2 === 0 ? 2 : 1 }} />
            <p className="text-sm">{i % 2 === 0 && Math.floor(i / 2)}</p>
          </div>
        ))}
        <div
          className="bg-red-500 h-10 w-1 absolute top-0 -translate-x-1/2 cursor-grab"
          style={{ left: `${(frame / template.fps / template.duration) * 100}%` }}
        />
      </div>
    </div>
  );
};
