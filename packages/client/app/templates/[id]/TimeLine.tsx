import { CompProps } from "@asius/types";
import { PlayerRef } from "@remotion/player";
import { Ref } from "react";

export const Timeline = ({
  selected,
  comps,
  setSelected,
  setComp,
  playerRef,
}: {
  selected: string;
  setSelected: (s: string) => void;
  setComp: (c: CompProps) => void;
  comps: CompProps[];
  playerRef: Ref<PlayerRef>;
}) => {
  return (
    <div className="h-full w-full ">
      <h1>Timeline</h1>
    </div>
  );
};
