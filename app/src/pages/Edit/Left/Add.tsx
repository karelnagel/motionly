import { Left } from ".";
import { useTemplateStore } from "../../../store";
import { Comp, components } from "@motionly/composition";
import { IoShapesSharp } from "react-icons/io5";

const def: Comp = {
  y: 0,
  x: 0,
  width: 100,
  height: 100,
  rotation: 0,
  opacity: 1,
  duration: 10,
  id: "",
  from: 0,
  type: "text",
  props: {},
  wrappers: {},
};
export const add: Left = {
  icon: IoShapesSharp,
  title: "Elements",
  component: () => {
    const entries = Object.entries(components).filter(([_, comp]) => comp.examples);
    const addComponent = useTemplateStore((state) => state.newComponent);
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
                {component.examples?.map(({ props, title, image }) => {
                  const final = { ...def, ...props, type: name };
                  return (
                    <div onClick={() => addComponent(final as any)} className="flex flex-col items-center cursor-pointer" key={title}>
                      <div className="aspect-square w-full rounded-lg bg-white">
                        {image ? (
                          <img src={image} className="w-full object-cover" />
                        ) : (
                          <div className="aspect-square w-full rounded-lg scale-50">
                            {/* Todo fix this shit */}
                            {/* <component.component {...(props.props as any)} /> */}
                          </div>
                        )}
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
