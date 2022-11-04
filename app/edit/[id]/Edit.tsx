"use client";

import { useState } from "react";
import { RightPanel } from "../../../components/RightPanel";
import { LeftPanel } from "../../../components/LeftPanel";
import { Player } from "../../../components/TemplatePlayer";
import { Template } from "../../../components/template";
import { ElementType, SizeType } from "../../../types";
import { Template as TemplateType } from "@prisma/client";

export default function Edit({ template }: { template: TemplateType }) {
  const [elements, setElements] = useState<ElementType[]>(JSON.parse(template.elements));
  const [size, setSize] = useState<SizeType>({ width: template.width, height: template.height });
  const [selected, setSelected] = useState<string>();
  const [scale, setScale] = useState(0.4);
  const select = (id: string) => {
    setSelected(id);
  };
  const find = (
    elements: ElementType[],
    setElement: (element: ElementType) => void
  ): { element: ElementType; setElement: (element: ElementType) => void } | undefined => {
    for (const element of elements) {
      if (element.id === selected) {
        return { element, setElement };
      }
      if (element.type === "div") {
        const found = find(element.children, (elem) =>
          setElement({
            ...element,
            children: element.children.map((e) => (e.id === elem.id ? elem : e)),
          })
        );
        if (found) {
          return found;
        }
      }
    }
  };

  const setElementBase = (element: ElementType) => {
    const elems = elements.map((e) => {
      if (e.id === element.id) {
        return element;
      }
      return e;
    });
    setElements(elems);
  };
  const foundElement = find(elements, setElementBase);

  return (
    <div className="min-h-screen w-full bg-gray-400 grid grid-cols-6">
      <LeftPanel
        elements={elements}
        select={select}
        selected={selected}
        name={template.name}
        setElements={(elements) => setElements(elements)}
      />
      <Player height={template.height} width={template.width} scale={scale} setScale={setScale}>
        <Template
          elements={elements}
          modifications={[]}
          select={select}
          selected={selected}
          setElements={setElements}
          width={template.width}
          height={template.height}
        />
      </Player>
      <RightPanel
        element={foundElement?.element}
        setElement={foundElement?.setElement}
        size={size}
        setSize={setSize}
      />
    </div>
  );
}
