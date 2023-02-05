import { BaseColor, ConfettiProps } from "@motionly/base";
import { Input } from "../../../../../../components/inputs";
import { Inputs, UserInput } from "../../../../../../components/inputs/Inputs";
import { useComponent, useStore } from "../../../../../../hooks/useStore";
import { EditSection } from "./EditSection";

const inputs: UserInput[] = [
  {
    prop: "angle",
    type: "number",
  },
  {
    prop: "count",
    type: "number",
  },
  {
    prop: "posX",
    type: "number",
  },
  {
    prop: "posY",
    type: "number",
  },
  {
    prop: "scalar",
    type: "number",
  },
  {
    prop: "spread",
    type: "number",
  },
  {
    prop: "startVelocity",
    type: "number",
  },
  {
    prop: "ticks",
    type: "number",
  },
];
export const EditConfetti = () => {
  const setComp = useStore((t) => t.setComp)<ConfettiProps>;
  const comp = useComponent() as ConfettiProps;

  return (
    <EditSection title="Audio">
      <Inputs inputs={inputs} />
      {comp.colors?.map((c, i, colors) => (
        <Input
          type="select"
          value={c}
          onChange={(color) =>
            setComp((c) => {
              c.colors = colors
                .map((c, j) => (i === j ? color : c))
                .filter((c) => c) as BaseColor[];
            })
          }
          label="Colors"
        />
      ))}
      <button
        className="btn"
        onClick={() =>
          setComp((c) => {
            if (!c.colors) c.colors = [];
            c.colors.push({ type: "basic", color: "#FFFFFFFF" });
          })
        }
      >
        Add color
      </button>
    </EditSection>
  );
};
