import { Left } from ".";
import { IoIosAdd } from "react-icons/io";
import { components } from "@motionly/components";
import { useStore } from "../../../store";
import { Comp } from "@motionly/composition";
const def: Partial<Comp> = {
  top: 0,
  left: 0,
  width: 100,
  height: 100,
  rotation: 0,
  opacity: 1,
  duration: 10,
  wrappers: { allWrappers: [], wrappers: {} },
};
export const add: Left = {
  icon: () => <IoIosAdd />,
  title: "Add",
  component: () => {
    const entries = Object.entries(components).filter(([_, comp]) => comp.examples);
    const addComponent = useStore((state) => state.newComponent);
    return (
      <div className="space-y-3">
        {entries.map(([name, component]) => {
          return (
            <div key={name} className="space-y-2">
              <h3 className="font-bold text-lg">
                {name[0].toUpperCase()}
                {name.slice(1)}
              </h3>
              <div className="grid grid-cols-3 gap-3 w-full">
                {component.examples?.map(({ props, title }) => {
                  const final = { ...def, ...props, componentName: name };
                  return (
                    <div onClick={() => addComponent(final as any)} className="flex flex-col items-center cursor-pointer" key={title}>
                      <div className="aspect-square w-full rounded-lg bg-white">
                        <div className="aspect-square w-full rounded-lg scale-50">
                          <component.component {...(props.props as any)} />
                        </div>
                      </div>

                      <h4 className="text-xs">{title}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};
