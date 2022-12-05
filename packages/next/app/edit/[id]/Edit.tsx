"use client";

import { useCallback, useEffect, useState } from "react";
import { RightPanel } from "./RightPanel";
import { LeftPanel } from "./LeftPanel";
import { Middle } from "./Middle";
import { ElementType, SizeType } from "@imageapi/types";
import { Template as TemplateType } from "@prisma/client";
import axios from "axios";
import { useShiftKey } from "../../../hooks/useShiftKey";
import { Player } from "../../../components/Player";

export default function Edit({ template }: { template: TemplateType }) {
  const [elements, setElements] = useState<ElementType[]>(JSON.parse(template.elements));
  const [size, setSize] = useState<SizeType>({ width: template.width, height: template.height });
  const [selected, setSelected] = useState<string>();
  const [scale, setScale] = useState(0.4);
  const lockAspectRatio = useShiftKey();
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
    <div className="min-h-screen w-full bg-gray-400 grid grid-cols-6">
      <LeftPanel
        id={template.id}
        elements={elements}
        select={select}
        selected={selected}
        name={template.name}
        setElements={(elements) => setElements(elements)}
        update={update}
      />
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
        element={foundElement?.element}
        setElement={foundElement?.setElement}
        size={size}
        setSize={setSize}
      />
    </div>
  );
}
