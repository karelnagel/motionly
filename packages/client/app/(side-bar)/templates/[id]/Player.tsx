"use client";

import { Player as AsiusPlayer, PlayerProps } from "@asius/player";

export const Player = (props: PlayerProps) => {
  return <AsiusPlayer {...props} />;
};
