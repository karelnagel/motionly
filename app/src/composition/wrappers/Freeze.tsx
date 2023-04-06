import { GiFrozenOrb } from "react-icons/gi";
import { Freeze as RemotionFreeze, useVideoConfig } from "remotion";
import { z } from "zod";
import { DefineWrapper } from ".";
import { Inputs } from "@motionly/inputs";

export const Freeze = z.object({
  type: z.literal("freeze"),
  spot: z.number().optional(),
});
type Freeze = z.infer<typeof Freeze>;
const inputs: Inputs<Freeze> = {
  spot: { number: { label: "Spot", placeholder: "No freeze" } },
};
export const freeze: DefineWrapper<Freeze> = {
  zod: Freeze,
  title: "Freeze",
  icon: GiFrozenOrb,
  default: { type: "freeze" },
  edit: ({ value, onChange }) => {
    return <Inputs value={value} inputs={inputs} onChange={onChange} />;
  },
  wrapper: ({ spot: spot, children }) => {
    const { fps } = useVideoConfig();
    if (spot === undefined) return <>{children}</>;
    else
      return (
        <RemotionFreeze frame={Math.round(spot * fps)}>
          <>{children}</>
        </RemotionFreeze>
      );
  },
};
