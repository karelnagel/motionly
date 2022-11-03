import { useState } from "react";
import { ElementEditor, RightPanel } from "../components/RightPanel";
import { Elements, LeftPanel } from "../components/LeftPanel";
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
  const [scale, setScale] = useState(0.25);
  const select = (id: string) => {
    setSelected(id);
  };
  const element = template.elements.find((element) => element.id === selected);
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
    <div className="min-h-screen w-full bg-gray-400 grid grid-cols-6">
      <LeftPanel
        elements={template.elements}
        select={select}
        selected={selected}
        id={template.id}
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
        element={element}
        setElement={setElement}
        template={template}
        setTemplate={setTemplate}
      />
    </div>
  );
}
