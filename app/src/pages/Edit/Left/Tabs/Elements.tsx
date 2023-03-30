import Image from "next/image";
import { useState } from "react";
import { getRandomId } from "../../../../../../helpers";
import { useProject } from "../../../../../../hooks/useProject";
import { sections, Section, Element, getWidthAndHeight } from "../../../../../../videos/elements";
import { components } from "../../Right/Tabs/components";

export default function Elements() {
  return (
    <div className="overflow-auto flex flex-col space-y-7">
      {sections.map((s, i) => {
        return <Section key={i} {...s} />;
      })}
    </div>
  );
}

const Section = (s: Section) => {
  const value = components[s.title];
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2 items-center" style={{ color: `hsl(${value.hue}, 50%, 70%)` }}>
        <value.Icon className="text-xl" />
        <p className="font-semibold">{value.name}</p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {s.elements.map((e, i) => {
          return <Element key={i} {...e} element={e} />;
        })}
      </div>
    </div>
  );
};

const Element = ({ element }: { element: Element }) => {
  const templateWidth = useProject((s) => s.project.template.width);
  const templateHeight = useProject((s) => s.project.template.height);
  const addComp = useProject((s) => s.addComp);
  const size = Math.max(templateHeight, templateWidth) * 0.2;
  const { height, width } = getWidthAndHeight(size, element.aspectRatio);
  return (
    <div
      onClick={() =>
        addComp({
          ...element.props,
          id: getRandomId(),
          width,
          height,
          x: templateWidth / 2 - width / 2,
          y: templateHeight / 2 - height / 2,
        })
      }
      className="flex flex-col items-center justify-center rounded-lg cursor-pointer space-y-2 bg-base-300 aspect-square"
    >
      <p className="leading-none text-sm text-center">{element.title}</p>
    </div>
  );
};
