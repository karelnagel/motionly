import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { PlayerRef } from "@remotion/player";

interface PlayerStore {
  scale: number;
  setScale: (scale: number) => void;
  frame: number;
  playerRef?: PlayerRef;
  setPlayerRef: (ref?: PlayerRef) => void;
  setFrame: (frame: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const usePlayer = create(
  immer<PlayerStore>((set) => ({
    frame: 0,
    scale: 0.2,
    isPlaying: false,
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setScale: (scale) => set({ scale }),
    setPlayerRef: (ref) => set({ playerRef: ref }),
    setFrame: (frame) => set({ frame }),
  }))
);
