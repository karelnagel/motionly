import { PlayerRef } from "@remotion/player";
import { SetType } from ".";

export interface PlayerSlice {
  scale: number;
  setScale: (scale: number) => void;
  frame: number;
  playerRef?: PlayerRef;
  setPlayerRef: (ref?: PlayerRef) => void;
  setFrame: (frame: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const playerSlice = (set: SetType): PlayerSlice => ({
  frame: 0,
  scale: 0.2,
  isPlaying: false,
  setIsPlaying: (isPlaying) =>
    set((s) => {
      s.player.isPlaying = isPlaying;
    }),
  setScale: (scale) =>
    set((s) => {
      s.player.scale = scale;
    }),
  setPlayerRef: (playerRef) =>
    set((s) => {
      s.player.playerRef = playerRef;
    }),
  setFrame: (frame) =>
    set((s) => {
      s.player.frame = frame;
    }),
});
