"use client";

import { CompProps } from "@asius/types/";

export const BottomPanel = ({
  selected,
  setSelected,
  comps,
  setComps,
}: {
  selected: string;
  setSelected: (id: string) => void;
  comps: CompProps[];
  setComps: (comps: CompProps[]) => void;
}) => {
  return <div className=""></div>;
};
