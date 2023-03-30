import { PlayerRef } from "@remotion/player";
import { SetType } from ".";

export interface PlayerSlice {
  playerScale: number;
  playerSetScale: (scale: number) => void;
  frame: number;
  playerRef?: PlayerRef;
  setPlayerRef: (ref?: PlayerRef) => void;
  setFrame: (frame: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const player = (set: SetType): PlayerSlice => ({
  frame: 0,
  playerScale: 0.2,
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  playerSetScale: (playerScale) => set({ playerScale }),
  setPlayerRef: (playerRef) => set({ playerRef }),
  setFrame: (frame) => set({ frame }),
});
