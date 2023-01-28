import { BaseColor, ConfettiProps } from "@motionly/base";
import { ColorInput, NumberInput } from "../../../../../../components/inputs";
import { EditSection } from "./EditSection";
import { SetComp } from "./index";

export const EditConfetti = ({
  comp,
  setComp,
}: {
  comp: ConfettiProps;
  setComp: SetComp;
}) => {
  return (
    <EditSection title="Audio">
      <NumberInput
        value={comp.angle}
        onChange={(angle) => setComp({ ...comp, angle })}
        label="Angle"
      />
      <NumberInput
        value={comp.count}
        onChange={(count) => setComp({ ...comp, count })}
        label="Count"
      />
      <NumberInput
        value={comp.posX}
        onChange={(posX) => setComp({ ...comp, posX })}
        label="Position X"
      />
      <NumberInput
        value={comp.posY}
        onChange={(posY) => setComp({ ...comp, posY })}
        label="Position Y"
      />
      <NumberInput
        value={comp.scalar}
        onChange={(scalar) => setComp({ ...comp, scalar })}
        label="Scalar"
      />
      <NumberInput
        value={comp.spread}
        onChange={(spread) => setComp({ ...comp, spread })}
        label="Spread"
      />
      <NumberInput
        value={comp.startVelocity}
        onChange={(startVelocity) => setComp({ ...comp, startVelocity })}
        label="Start Velocity"
      />
      <NumberInput
        value={comp.ticks}
        onChange={(ticks) => setComp({ ...comp, ticks })}
        label="Ticks"
      />
      {comp.colors?.map((c, i, colors) => (
        <ColorInput
          value={c}
          onChange={(color) =>
            setComp({
              ...comp,
              colors: colors
                .map((c, j) => (i === j ? color : c))
                .filter((c) => c) as BaseColor[],
            })
          }
          label="Colors"
        />
      ))}
      <button
        className="btn"
        onClick={() =>
          setComp({
            ...comp,
            colors: [
              ...(comp.colors || []),
              { type: "basic", color: "#FFFFFFFF" },
            ],
          })
        }
      >
        Add color
      </button>
    </EditSection>
  );
};
