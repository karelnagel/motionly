import { Right } from ".";
import { useComponent, useTemplateStore } from "../../../store";
import { components } from "@motionly/composition";
import { Input } from "@motionly/inputs";
import { capitalize } from "../../../helpers";

export const component: Right = {
  icon: () => {
    const comp = useComponent();
    const Icon = components[comp.type].Icon;
    return <Icon />;
  },
  show: (c) => !!c,
  title: () => {
    const comp = useComponent();
    return <>{capitalize(comp.type)}</>;
  },
  component: () => {
    const component = useComponent();
    const editComponentProps = useTemplateStore((state) => state.editComponentProps);
    const inputs = Object.entries(components[component.type].inputs);
    return (
      <div className="flex flex-col space-y-2">
        {inputs.map(([key, input]) => {
          const value = component.props[key as keyof typeof component];
          return <Input key={key} value={value} onChange={(e) => editComponentProps({ [key]: e })} props={input} />;
        })}
      </div>
    );
  },
};
