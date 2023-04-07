import { PlayerRef } from "@motionly/player";
import { z } from "zod";
import { storeBase } from ".";

const PlayerStore = z.object({
  playerScale: z.number(),
  playerSetScale: z.function().args(z.number()).returns(z.void()),
  frame: z.number(),
  setFrame: z.function().args(z.number()).returns(z.void()),
  playerRef: z.any().optional(),
  setPlayerRef: z.function().args(z.any().optional()).returns(z.void()),
  isPlaying: z.boolean(),
  setIsPlaying: z.function().args(z.boolean()).returns(z.void()),
});

export const usePlayerStore = storeBase(
  (set) => ({
    frame: 0,
    playerScale: 0.2,
    isPlaying: false,
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    playerSetScale: (playerScale) => set({ playerScale }),
    setPlayerRef: (playerRef) => set({ playerRef }),
    setFrame: (frame) => set({ frame }),
  }),
  PlayerStore,
  "player"
);
export const usePlayerRef = () => usePlayerStore((s) => s.playerRef) as PlayerRef | undefined;
