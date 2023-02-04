import {
  animationProps,
  AnimationProps,
  animationTypes,
  EasingTypes,
} from "@motionly/base";
import { Input } from "../../../../../../components/inputs";
import { getRandomId } from "../../../../../../helpers";
import { getAnimationColor } from "../../../../../../helpers/color";
import { useComponent, useStore } from "../../../../../../hooks/useStore";

export const EditAnimation = ({}: {}) => {
  const comp = useComponent();
  const setComp = useStore((t) => t.setComp);
  const animations = comp?.animations;
  return (
    <div>
      {animations?.allIds.map((id, i) => (
        <OneAnimation key={id} id={id} />
      ))}
      <button
        className="btn btn-primary btn-block btn-sm"
        onClick={() =>
          setComp((c) => {
            const id = getRandomId();
            if (!c.animations) c.animations = { allIds: [], byIds: {} };
            c.animations.allIds.push(id);
            c.animations.byIds[id] = {
              id,
              prop: "scale",
              type: "spring",
            };
          })
        }
      >
        Add new
      </button>
    </div>
  );
};
const OneAnimation = ({ id }: { id: string }) => {
  const animation = useStore(
    (t) => t.project.template.components[t.selected].animations?.byIds[id]
  );
  if (!animation) return null;

  const setComp = useStore((t) => t.setComp);
  const remove = () => {
    setComp((c) => {
      c.animations!.allIds = c.animations!.allIds.filter((i) => i !== id);
      delete c.animations!.byIds[id];
    });
  };
  const setAnimation = (func: (a: AnimationProps) => void) => {
    setComp((c) => {
      func(c.animations!.byIds[id]);
    });
  };
  const units = animationProps[animation.prop].units;
  return (
    <div className="mb-4 space-y-2">
      <div className="flex justify-between">
        <p className="font-bold">Animation {id}</p>
        <button onClick={remove} className="btn btn-xs btn-error">
          Remove
        </button>
      </div>
      <div
        style={{ background: getAnimationColor(animation) }}
        className="h-[3px] rounded-full"
      />
      <div className="grid grid-cols-4 gap-2">
        <Input
          type="select"
          label="Prop"
          prop={`animations.byIds.${id}.prop`}
          value={animation.prop}
          onChange={(prop) =>
            setAnimation((a) => {
              a.prop = prop as keyof typeof animationProps;
            })
          }
          options={Object.entries(animationProps).map(([value, { label }]) => ({
            value,
            label,
          }))}
        />
        <Input
          type="select"
          label="Type"
          prop={`animations.byIds.${id}.type`}
          value={animation.type}
          onChange={(type_) =>
            setAnimation((c) => {
              c.type = type_ as keyof typeof animationTypes;
            })
          }
          options={Object.entries(animationTypes).map(([value, label]) => ({
            value,
            label,
          }))}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          type="number"
          label="Start (s)"
          prop={`animations.byIds.${id}.start`}
          onChange={(start) =>
            setAnimation((a) => {
              a.start = start;
            })
          }
          value={animation.start}
        />
        <Input
          type="number"
          label="Duration (s)"
          placeholder="MAX"
          prop={`animations.byIds.${id}.duration`}
          onChange={(duration) =>
            setAnimation((a) => {
              a.duration = duration;
            })
          }
          value={animation.duration}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          type="number"
          prop={`animations.byIds.${id}.from`}
          label={`From ${units ? `(${units})` : ""}`}
          onChange={(from) =>
            setAnimation((a) => {
              a.from = from;
            })
          }
          value={animation.from}
        />
        <Input
          type="number"
          label={`To ${units ? `(${units})` : ""}`}
          prop={`animations.byIds.${id}.to`}
          onChange={(to) =>
            setAnimation((a) => {
              a.to = to;
            })
          }
          value={animation.to}
        />
      </div>

      {animation.type === "spring" && (
        <div className="grid grid-cols-3 gap-2">
          <Input
            type="number"
            label="Mass"
            prop={`animations.byIds.${id}.mass`}
            onChange={(mass) =>
              setAnimation((a) => {
                if (a.type === "spring") a.mass = mass;
              })
            }
            value={animation.mass}
          />

          <Input
            type="number"
            label="Damping"
            prop={`animations.byIds.${id}.damping`}
            onChange={(damping) =>
              setAnimation((a) => {
                if (a.type === "spring") a.damping = damping;
              })
            }
            value={animation.damping}
          />

          <Input
            type="number"
            label="Stiffness"
            prop={`animations.byIds.${id}.stiffness`}
            onChange={(stiffness) =>
              setAnimation((a) => {
                if (a.type === "spring") a.stiffness = stiffness;
              })
            }
            value={animation.stiffness}
          />
        </div>
      )}
      {animation.type === "noise" && (
        <Input
          type="number"
          label="Speed"
          prop={`animations.byIds.${id}.speed`}
          onChange={(speed) =>
            setAnimation((a) => {
              if (a.type === "noise") a.speed = speed;
            })
          }
          value={animation.speed}
        />
      )}
      {animation.type === "interpolate" && (
        <Input
          type="number"
          label="Easing"
          prop={`animations.byIds.${id}.easing`}
          onChange={(easing) =>
            setAnimation((a) => {
              if (a.type === "interpolate") a.easing = easing;
            })
          }
          value={animation.easing}
          options={Object.entries(EasingTypes).map(([value, label]) => ({
            value,
            label,
          }))}
        />
      )}
      {(animation.prop === "text" || animation.prop === "number") && (
        <Input
          type="text"
          label="Variable"
          prop={`animations.byIds.${id}.variable`}
          onChange={(variable) =>
            setAnimation((a) => {
              if (a.prop === "text" || a.prop === "number")
                a.variable = variable;
            })
          }
          value={animation.variable}
        />
      )}
      {animation.prop === "text" && (
        <Input
          type="text"
          label="Value"
          prop={`animations.byIds.${id}.value`}
          onChange={(value) =>
            setAnimation((a) => {
              if (a.prop === "text") a.value = value;
            })
          }
          value={animation.value}
        />
      )}
    </div>
  );
};
