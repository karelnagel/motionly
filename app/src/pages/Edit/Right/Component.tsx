import { Right } from ".";
import { useComponent, useTemplateStore } from "../../../store";
import { components } from "../../../composition";
import { Inputs } from "@motionly/inputs";
import { capitalize } from "../../../helpers";

export const component: Right = {
  icon: () => {
    const type = useComponent((c) => c.type);
    if (!type) return null;
    const Icon = components[type].Icon;
    return <Icon />;
  },
  title: () => {
    const type = useComponent((c) => c.type);
    if (!type) return null;
    return <>{capitalize(type)}</>;
  },
  component: () => {
    const props = useComponent((c) => c.props);
    const inputs = useComponent((c) => components[c.type].inputs);
    const editComponentProps = useTemplateStore((state) => state.editComponentProps);
    if (!props || !inputs) return null;
    return <Inputs inputs={inputs} value={props} onChange={(v) => editComponentProps(v, false, undefined)} />;
  },
};
