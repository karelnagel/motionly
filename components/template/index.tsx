import { ElementType, TemplateType } from "../../types";
import { Element } from "./element";

export const Template = ({
  template,
  modifications,
  selected,
  select,
  setTemplate,
}: {
  template: TemplateType;
  modifications: ElementType[];
  select?: (id: string) => void;
  selected?: string;
  setTemplate: (template: TemplateType) => void;
}) => {
  const setElement = (element: ElementType) => {
    const elements = template.elements.map((e) => {
      if (e.id === element.id) {
        return element;
      }
      return e;
    });
    setTemplate({ ...template, elements });
  };
  return (
    <div
      style={{
        display: "flex",
        width: `${template.width}px`,
        height: `${template.height}px`,
        margin: "0",
        padding: 0,
      }}
    >
      {template.elements.map((element, index) => {
        const modifiedElement = {
          ...element,
          ...modifications.find((mod) => mod.id === element.id),
        };
        return (
          <Element
            key={index}
            element={modifiedElement}
            select={select}
            selected={selected}
            setElement={setElement}
          />
        );
      })}
    </div>
  );
};
