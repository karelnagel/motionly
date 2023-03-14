import { AnimationProps, animationProps, AnimationTypes } from "@motionly/base";
import { useState } from "react";
import { IoIosTrash } from "react-icons/io";
import { VariableInput } from "../../../../../../../components/inputs";
import { ShowHide } from "../../../../../../../components/ShowHide";
import { useProject } from "../../../../../../../hooks/useProject";

export const OneAnimation = ({ id }: { id: string }) => {
  const [show, setShow] = useState(false);
  const animation = useProject(
    (t) => t.project.template.components[t.selected].animations?.byIds[id]
  );
  if (!animation) return null;

  const setComp = useProject((t) => t.setComp);
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
  const units = animationProps[animation.prop]?.units;
  return (
    <div className=" space-y-2 bg-base-200 rounded-lg p-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ShowHide show={show} setShow={setShow} />
          <input
            className="shrink font-semibold text-[14px] input input-sm leading-none h-6 max-w-[170px] input-ghost"
            value={animation.name}
            onChange={(e) =>
              setAnimation((a) => {
                a.name = e.target.value;
              })
            }
          />
        </div>
        <div className="flex items-center space-x-2">
          <p
            onClick={() => setShow((s) => true)}
            className={`text-sm duration-150 ${
              show ? "opacity-0" : "opacity-80"
            }`}
          >
            {animation.prop}
          </p>
          <button onClick={remove} className="text-error">
            <IoIosTrash />
          </button>
        </div>
      </div>
      {show && (
        <div className="grid grid-cols-7 gap-1 relative">
          <VariableInput
            type="animation-props"
            label="Prop"
            className="col-span-3"
            value={animation.prop}
            onChange={(prop) =>
              setAnimation((a) => {
                a.prop = prop as keyof typeof animationProps;
              })
            }
          />
          <VariableInput
            type="number"
            className="col-span-2"
            label="Start (s)"
            prop={`animations.byIds.${id}.start`}
            onChange={(start) =>
              setAnimation((a) => {
                a.start = start;
              })
            }
            value={animation.start}
          />
          <VariableInput
            type="number"
            className="col-span-2"
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
          <VariableInput
            type="animation-types"
            label="Type"
            className="col-span-3"
            value={animation.type}
            onChange={(type_) =>
              setAnimation((c) => {
                c.type = type_ as AnimationTypes;
              })
            }
          />

          <VariableInput
            type="number"
            className="col-span-2"
            prop={`animations.byIds.${id}.from`}
            label={`From ${units ? `(${units})` : ""}`}
            onChange={(from) =>
              setAnimation((a) => {
                a.from = from;
              })
            }
            value={animation.from}
          />
          <VariableInput
            type="number"
            className="col-span-2"
            label={`To ${units ? `(${units})` : ""}`}
            prop={`animations.byIds.${id}.to`}
            onChange={(to) =>
              setAnimation((a) => {
                a.to = to;
              })
            }
            value={animation.to}
          />

          {/* {animation.type === "spring" && (
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
      )} */}
          {(animation.prop === "text" || animation.prop === "number") && (
            <VariableInput
              type="text"
              label="Variable"
              className="col-span-3"
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
            <VariableInput
              type="text"
              label="Value"
              className="col-span-4"
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
      )}
    </div>
  );
};
