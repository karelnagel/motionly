import { PlayerRef } from "@remotion/player";
import { Ref } from "react";
import { Scale } from "../../../components/Scale";

export const PlayerControls = ({
  scale,
  setScale,
  playerRef,
}: {
  scale: number;
  setScale: (s: number) => void;
  playerRef: Ref<PlayerRef>;
}) => {
  return (
    <div className="absolute bottom-0 left-0 p-3 w-full">
      <div className="w-full flex justify-between panel">
        <div>Mute</div>
        <div>BackPauseForward</div>
        <div>
          <Scale scale={scale} setScale={setScale} />
        </div>
      </div>
    </div>
  );
};
