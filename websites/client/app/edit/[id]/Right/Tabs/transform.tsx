import { ComponentProps, transformProps } from "@motionly/base";
import { Tab } from ".";
import { MdTransform } from "react-icons/md";
import { useProject } from "../../../../../hooks/useProject";
import { useComponent } from "../../../../../hooks/useComponent";
import { VariableInput } from "../../../../../components/inputs";
import { useState } from "react";
import { IoIosRemove } from "react-icons/io";

const component = () => {
  const comp = useComponent();
  const setComp = useProject((t) => t.setComp);
  const [nextProp, setNextProp] = useState<keyof typeof transformProps>();
  return (
    <div className="col-span-2 space-y-2">
      {comp?.transforms?.map((t, i) => {
        const units = transformProps[t.prop].units;
        return (
          <div key={i} className="flex items-center space-x-3">
            <VariableInput
              type="number"
              className="w-full"
              prop={`transforms.${i}.value`}
              label={`${transformProps[t.prop].label} ${
                units ? `(${units})` : ""
              }`}
              value={t.value}
              onChange={(value) =>
                setComp((c) => {
                  if (!c.transforms) c.transforms = [];
                  c.transforms[i].value = value;
                })
              }
            />
            <IoIosRemove
              className="w-5 h-5 p-1 aspect-square bg-error text-error-content rounded-full cursor-pointer"
              onClick={() => {
                setComp((c) => {
                  if (!c.transforms) return;
                  c.transforms.splice(i, 1);
                });
              }}
            />
          </div>
        );
      })}
      <div className="flex items-center space-x-2">
        <VariableInput
          className="w-full"
          type="select"
          options={Object.entries(transformProps).map(([value, { label }]) => ({
            value,
            label,
          }))}
          value={nextProp}
          onChange={(e) => setNextProp(e as any)}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            if (!nextProp) return;
            setComp((c) => {
              if (!c.transforms) c.transforms = [];
              c.transforms.push({
                prop: nextProp,
                value: 0,
              });
            });
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export const transform: Tab<ComponentProps> = {
  name: "Transform",
  Icon: MdTransform,
  component,
};
