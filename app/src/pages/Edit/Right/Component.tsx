import { Right } from ".";
import { IoIosCompass } from "react-icons/io";
import { useComponent, useComponentProps, useStore } from "../../../store";
import { components } from "@motionly/components";
import { Input } from "@motionly/inputs";

export const component: Right = {
  icon: IoIosCompass,
  title: "Component",
  component: () => {
    const component = useComponent();
    const editComponentProps = useStore((state) => state.editComponentProps);
    const inputs = Object.entries(components[component.type].inputs);
    return (
      <div>
        {inputs.map(([key, input]) => {
          const value = component.props[key as keyof typeof component];
          return <Input key={key} value={value} onChange={(e) => editComponentProps({ [key]: e })} props={input} />;
        })}
      </div>
    );
  },
};
