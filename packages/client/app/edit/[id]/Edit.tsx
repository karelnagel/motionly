"use client";

import { useCallback, useEffect, useState } from "react";
import { RightPanel } from "./RightPanel";
import { LeftPanel } from "./LeftPanel";
import { Middle } from "./Middle";
import { Template as TemplateType } from "@prisma/client";
import axios from "axios";
import { useShiftKey } from "../../../hooks/useShiftKey";
import { Player } from "../../../components/Player";
import { CompProps, SizeProps } from "../../../types";

export default function Edit({ template }: { template: TemplateType }) {
  const [elements, setElements] = useState<CompProps[]>(JSON.parse(template.elements));
  const [size, setSize] = useState<SizeProps>({ width: template.width, height: template.height });
  const [selected, setSelected] = useState<string>();
  const [scale, setScale] = useState(0.4);
  const lockAspectRatio = useShiftKey();
  const select = (id: string) => {
    setSelected(id);
  };
  const find = (
    elements: CompProps[],
    setElement: (element: CompProps) => void
  ): { element: CompProps; setElement: (element: CompProps) => void } | undefined => {
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

  const setElementBase = (element: CompProps) => {
    const elems = elements.map((e) => {
      if (e.id === element.id) {
        return element;
      }
      return e;
    });
    setElements(elems);
  };
  const foundElement = find(elements, setElementBase);

  const update = useCallback(async () => {
    const result = await axios.put(`/api/templates/${template.id}`, {
      elements: JSON.stringify(elements),
      width: size.width,
      height: size.height,
    });
    setElements(JSON.parse(result.data.elements));
    setSize({ width: result.data.width, height: result.data.height });
  }, [elements, size, template.id]);

  useEffect(() => {
    const interval = setInterval(() => update(), 5000);
    return () => {
      clearInterval(interval);
    };
  }, [update]);

  return (
    <div className="h-screen">
      <div className=" w-full bg-gray-400 grid grid-cols-5 h-[70%]">
        <Middle height={size.height} width={size.width} scale={scale} setScale={setScale}>
          <Player
            elements={elements}
            height={size.height}
            width={size.width}
            lockAspectRatio={lockAspectRatio}
            scale={scale}
            select={select}
            setElements={setElements}
            selected={selected}
          />
        </Middle>
        <RightPanel
          props={foundElement?.element}
          setProps={foundElement?.setElement}
          size={size}
          setSize={setSize}
        />
      </div>
      <div className="bg-blue-50 h-[30%] w-full"></div>
      <LeftPanel
        id={template.id}
        elements={elements}
        select={select}
        selected={selected}
        name={template.name}
        setElements={(elements) => setElements(elements)}
        update={update}
      />
    </div>
  );
}
