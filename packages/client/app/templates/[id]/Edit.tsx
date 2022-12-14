"use client";

import { useCallback, useEffect, useState } from "react";
import { RightPanel } from "./RightPanel";
import { BottomPanel } from "./LeftPanel";
import { Middle } from "./Middle";
import { Template as TemplateType } from "@prisma/client";
import axios from "axios";
import { useShiftKey } from "../../../hooks/useShiftKey";
import { Player } from "../../../components/Player";
import { CompProps, SizeProps } from "@asius/types";

export default function Edit({ template }: { template: TemplateType }) {
  const [comps, setComps] = useState<CompProps[]>(JSON.parse(template.comps));
  const [size, setSize] = useState<SizeProps>({ width: template.width, height: template.height });
  const [selected, setSelected] = useState("");
  const [scale, setScale] = useState(0.4);
  const [durationInFrames, setDurationInFrames] = useState(1);
  const lockAspectRatio = useShiftKey();

  const setComp = (element: CompProps) => {
    const get = (comps: CompProps[]) => {
      return comps.map((comp) => {
        if (comp.id === element.id) {
          comp = element;
        }
        if (comp.type === "div" && comp.children) {
          comp.children = get(comp.children);
        }
        return comp;
      });
    };
    const newComps = get(comps);
    setComps(newComps);
  };

  const find = (comps: CompProps[]): CompProps | null => {
    let selectedComp = comps.find((comp) => comp.id === selected) || null;
    if (selectedComp) return selectedComp;
    comps.forEach((comp) => (comp.type === "div" ? (selectedComp = find(comp.children)) : null));
    return selectedComp;
  };
  const selectedComp = find(comps);

  const update = useCallback(async () => {
    const result = await axios.put(`/api/templates/${template.id}`, {
      comps: JSON.stringify(comps),
      width: size.width,
      height: size.height,
    });
    setComps(JSON.parse(result.data.comps));
    setSize({ width: result.data.width, height: result.data.height });
  }, [comps, size, template.id]);

  useEffect(() => {
    const interval = setInterval(() => update(), 5000);
    return () => {
      clearInterval(interval);
    };
  }, [update]);

  return (
    <div className="h-screen">
      <div className=" w-full bg-gray-400 grid grid-cols-5 h-[70%]">
        <Middle height={size.height} width={size.width} scale={scale} setScale={setScale}>
          <Player
            comps={comps}
            height={size.height}
            width={size.width}
            durationInFrames={durationInFrames}
            edit={{ lockAspectRatio, scale, select: setSelected, setComp, selected }}
          />
        </Middle>
        <RightPanel comp={selectedComp} setComp={setComp} size={size} setSize={setSize} />
      </div>
      <div className="bg-blue-50 h-[30%] w-full"></div>
      <BottomPanel
        comps={comps}
        setSelected={setSelected}
        selected={selected}
        setComps={setComps}
      />
    </div>
  );
}
