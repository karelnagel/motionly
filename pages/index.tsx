import { useState } from "react";
import { RightPanel } from "../components/RightPanel";
import { LeftPanel } from "../components/LeftPanel";
import { Player } from "../components/player";
import { Template } from "../components/template";
import { ElementType } from "../types";
import { DEFAULT_TEMPLATE } from "../types/defaults";

export interface Template {
  name: string;
}

export default function Home() {
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
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
    const elements = template.elements.map((e) => {
      if (e.id === element.id) {
        return element;
      }
      return e;
    });
    setTemplate({ ...template, elements });
  };
  const foundElement = find(template.elements, setElementBase);
  return (
    <div className="min-h-screen w-full bg-gray-400 grid grid-cols-6">
      <LeftPanel
        elements={template.elements}
        select={select}
        selected={selected}
        id={template.id}
        setElements={(elements) => setTemplate({ ...template, elements })}
      />
      <Player height={template.height} width={template.width} scale={scale} setScale={setScale}>
        <Template
          template={template}
          modifications={[]}
          select={select}
          selected={selected}
          setTemplate={setTemplate}
        />
      </Player>
      <RightPanel
        element={foundElement?.element}
        setElement={foundElement?.setElement}
        template={template}
        setTemplate={setTemplate}
      />
    </div>
  );
}
