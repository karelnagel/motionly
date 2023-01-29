"use client";

import { Player as MotionlyPlayer, PlayerProps } from "@motionly/player";

export const Player = (props: PlayerProps) => {
  return <MotionlyPlayer {...props} />;
};
