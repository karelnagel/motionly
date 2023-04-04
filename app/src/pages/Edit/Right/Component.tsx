import { Right } from ".";
import { useComponent, useTemplateStore } from "../../../store";
import { components } from "../../../composition";
import { Input } from "../../../inputs";
import { capitalize } from "../../../helpers";

export const component: Right = {
  icon: () => {
    const type = useComponent((c) => c.type)!;
    const Icon = components[type].Icon;
    return <Icon />;
  },
  title: () => {
    const type = useComponent((c) => c.type)!;
    return <>{capitalize(type)}</>;
  },
  component: () => {
    const props = useComponent((c) => c.props);
    const inputs = useComponent((c) => Object.entries(components[c.type].inputs));
    const editComponentProps = useTemplateStore((state) => state.editComponentProps);
    if (!props || !inputs) return null;
    return (
      <div className="flex flex-col space-y-2">
        {inputs.map(([key, input]) => {
          const value = props[key];
          return <Input key={key} value={value} onChange={(e) => editComponentProps({ [key]: e })} props={input} />;
        })}
      </div>
    );
  },
};
