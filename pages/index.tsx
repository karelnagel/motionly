import { useState } from "react";
import { ElementEditor } from "../components/editor";
import { Template } from "../components/template";
import { ElementType } from "../types";
import { DEFAULT_TEMPLATE } from "../types/defaults";

export interface Template {
  name: string;
}

export default function Home() {
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const [selected, setSelected] = useState<string>();
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
    <div className="min-h-screen min-w-screen bg-gray-400 flex flex-col items-center">
      <div className="text-xl font-bold">Template: {template.id}</div>
      <a href="/api/image" target="_blank">
        VIEW
      </a>
      <div className="grid grid-cols-6">
        <Elements elements={template.elements} select={select} selected={selected} />
        <div className="overflow-hidden col-span-4 bg-white">
          <div
            className=" border border-black"
            style={{
              marginTop: `-${template.height / 4}px`,
              marginLeft: `-${template.width / 6}px`,
              transform: `scale(0.5)`,
              height: `${template.height / 2}px`,
              width: `${template.width / 2}px`,
              aspectRatio: `${template.width / template.height}`,
            }}
          >
            <Template template={template} modifications={[]} select={select} selected={selected} />
          </div>
        </div>

        <div>{element && <ElementEditor element={element} setElement={setElement} />}</div>
      </div>
    </div>
  );
}
export const Elements = ({
  selected,
  elements,
  select,
}: {
  selected?: string;
  elements: ElementType[];
  select: (id: string) => void;
}) => {
  return (
    <div>
      {elements.map((element, index) => (
        <div key={index}>
          <p
            onClick={() => select(element.id)}
            className="cursor-pointer"
            style={{ background: selected === element.id ? "red" : "transparent" }}
          >
            {element.id}
          </p>
          {element.type === "div" && (
            <div className="ml-2">
              <Elements elements={element.children} select={select} selected={selected} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
