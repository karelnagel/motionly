import { useState } from "react";
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
        <div className="">
          {template.elements.map((element, index) => (
            <div
              key={index}
              onClick={() => select(element.id)}
              className="cursor-pointer"
              style={{ background: selected === element.id ? "red" : "transparent" }}
            >
              {element.id}
            </div>
          ))}
        </div>
        <div className="overflow-hidden col-span-4 bg-white">
          <div className="scale-50 -m-[25%] overflow-hidden border border-black">
            <Template template={template} modifications={[]} select={select} selected={selected} />
          </div>
        </div>

        <div>{element && <ElementEditor element={element} setElement={setElement} />}</div>
      </div>
    </div>
  );
}

export const ElementEditor = ({
  element,
  setElement,
}: {
  element: ElementType;
  setElement: (element: ElementType) => void;
}) => {
  return (
    <div>
      <p>{element.id}</p>
      <NumberInput label="X" value={element.x} onChange={(x) => setElement({ ...element, x })} />
      <NumberInput label="Y" value={element.y} onChange={(y) => setElement({ ...element, y })} />
      <NumberInput
        label="Height"
        value={element.height}
        onChange={(height) => setElement({ ...element, height })}
      />
      <NumberInput
        label="width"
        value={element.width}
        onChange={(width) => setElement({ ...element, width })}
      />
    </div>
  );
};
export const NumberInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) => {
  return (
    <div>
      <label>{label}</label>
      <input value={value || 0} onChange={(e) => onChange(parseInt(e.target.value))} />
    </div>
  );
};
