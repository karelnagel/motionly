"use client";

import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { Rnd } from "react-rnd";
import { ElementType } from "../../../types";
import { DEFAULT_DIV, DEFAULT_IMAGE, DEFAULT_TEXT } from "../../../types/defaults";

export const LeftPanel = ({
  selected,
  id,
  elements,
  select,
  name,
  setElements,
  update,
}: {
  name: string;
  id: string;
  selected?: string;
  elements: ElementType[];
  select: (id: string) => void;
  setElements: (elements: ElementType[]) => void;
  update: () => void;
}) => {
  return (
    <div className="bg-base-100 h-full flex flex-col text-base-content border-t">
      <p
        className=" w-full bg-base-300 uppercase font-bold text-center py-3 text-lg mb-2 cursor-pointer"
        onClick={() => select("")}
      >
        {name}
      </p>
      <Elements elements={elements} select={select} selected={selected} setElements={setElements} />
      <AddElement elements={elements} setElements={setElements} />
      <div className="mt-auto flex justify-between p-2">
        <button onClick={update}>SAVE</button>
        <a href={`/api/images/${id}`} target="_blank" rel="noreferrer">
          VIEW
        </a>
        <a href={`/api/images/${id}`} target="_blank" download rel="noreferrer">
          DOWN
        </a>
      </div>
    </div>
  );
};
type ElementWLevel = {
  element: ElementType;
  level: number;
};
export const Elements = ({
  selected,
  elements,
  select,
  setElements,
}: {
  selected?: string;
  elements: ElementType[];
  select: (id: string) => void;
  setElements: (elements: ElementType[]) => void;
}) => {
  const recursion = (elements: ElementType[], level: number): ElementWLevel[] => {
    return elements.flatMap((element) =>
      element.type === "div"
        ? ([{ element, level }, ...recursion(element.children, level + 1)] as ElementWLevel[])
        : [{ element, level }]
    );
  };
  const elems = recursion(elements, 0);
  const height = 30;

  return (
    <div className="h-full">
      {elems.map(({ element, level }, index) => (
        <Rnd
          key={index}
          bounds="parent"
          enableResizing={false}
          disableDragging={selected !== element.id}
          dragGrid={[10, 10]}
          size={{ width: 200, height }}
          position={{ x: level*20, y: index * height }}
          onClick={() => select(element.id)}
          onDragStop={(e, d) => {
            console.log(d);
          }}
        >
          <div
            className={`cursor-pointer flex justify-between items-center py-1 px-2 ${
              selected === element.id ? "bg-primary" : ""
            }`}
          >
            <p>{element.id}</p>
            <AiFillDelete
              onClick={() => setElements(elements.filter((e) => e.id !== element.id))}
            />
          </div>
        </Rnd>
      ))}
    </div>
  );
};
export const AddElement = ({
  elements,
  setElements,
}: {
  elements: ElementType[];
  setElements: (elements: ElementType[]) => void;
}) => {
  const elems = [
    { name: "div", element: DEFAULT_DIV },
    { name: "text", element: DEFAULT_TEXT },
    { name: "image", element: DEFAULT_IMAGE },
  ];
  return (
    <div className="flex justify-center pt-10">
      <div className="dropdown ">
        <label
          tabIndex={0}
          className="text-xl flex items-center bg-base-300 p-[6px] px-2 rounded-lg font-bold space-x-2 cursor-pointer"
        >
          <AiOutlinePlus />
          Add
        </label>
        <ul tabIndex={0} className="dropdown-content shadow bg-base-300 rounded-lg text-center">
          {elems.map((elem, index) => (
            <li
              key={index}
              onClick={() =>
                setElements([...elements, elem.element(`${elem.name}-${elements.length}`)])
              }
              className=" uppercase font-bold  m-4 cursor-pointer"
            >
              <a>{elem.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
