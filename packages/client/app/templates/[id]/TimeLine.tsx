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
    <div className="h-full w-full flex flex-col ">
      <div className="h-14 w-full relative p-3">
        <div className=" relative ">
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
            className="bg-red-500 h-8 w-1 absolute top-0 -translate-x-1/2 cursor-grab"
            style={{ left: `${(frame / template.fps / template.duration) * 100}%` }}
          />
        </div>
      </div>
      <div className="overflow-y-scroll h-full flex flex-col px-3 ">
        {template.comps.map((comp) => (
          <div
            key={comp.id}
            className="w-full relative cursor-pointer py-1"
            onClick={() => {
              setSelected(comp.id);
            }}
          >
            <div
              className="p-2 rounded-lg w-full relative h-10 cursor-pointer py-1"
              key={comp.id}
              onClick={() => {
                setSelected(comp.id);
              }}
            >
              <div
                className={`absolute top-0 h-full rounded-lg flex items-center px-2 ${
                  comp.id === selected ? "bg-primary text-primary-content" : "bg-base-200"
                }`}
                style={{
                  boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                  left: `${(comp.from / template.duration) * 100}%`,
                  width: `${
                    comp.duration
                      ? (comp.duration / template.duration) * 100
                      : 100 - (comp.from / template.duration) * 100
                  }%`,
                }}
              >
                {comp.id}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
