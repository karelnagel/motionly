import { AbsoluteFill } from "remotion";
import { useSelected } from "./useSelected";
import { z } from "zod";
import { Component } from "./Component";
import { Comp } from "@motionly/components";
export * from "./useSelected";
export * from "./Component";

export const Template = z.object({
  id: z.string(),
  name: z.string(),
  height: z.number(),
  width: z.number(),
  fps: z.number(),
  duration: z.number(),
  background: z.string().optional(),
  components: z.record(Comp),
  allComponents: z.string().array(),
});
export type Template = z.infer<typeof Template>;

export const Composition = ({ allComponents, components, background }: Template) => {
  // Todo fonts
  const { setSelected } = useSelected();
  return (
    <AbsoluteFill style={{ background }} onClick={() => setSelected("")}>
      {allComponents.map((c) => (
        <Component key={c} {...components[c]} />
      ))}
    </AbsoluteFill>
  );
};
