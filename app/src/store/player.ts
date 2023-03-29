import { PlayerRef } from "@remotion/player";
import { SetType } from ".";

export interface PlayerSlice {
  playerScale: number;
  playerSetScale: (scale: number) => void;
  playerFrame: number;
  playerRef?: PlayerRef;
  playerSetPlayerRef: (ref?: PlayerRef) => void;
  playerSetFrame: (frame: number) => void;
  playerIsPlaying: boolean;
  playerSetIsPlaying: (isPlaying: boolean) => void;
}

export const player = (set: SetType): PlayerSlice => ({
  playerFrame: 0,
  playerScale: 0.2,
  playerIsPlaying: false,
  playerSetIsPlaying: (isPlaying) =>
    set((s) => {
      s.playerIsPlaying = isPlaying;
    }),
  playerSetScale: (scale) =>
    set((s) => {
      s.playerScale = scale;
    }),
  playerSetPlayerRef: (playerRef) =>
    set((s) => {
      s.playerRef = playerRef;
    }),
  playerSetFrame: (frame) =>
    set((s) => {
      s.playerFrame = frame;
    }),
});
