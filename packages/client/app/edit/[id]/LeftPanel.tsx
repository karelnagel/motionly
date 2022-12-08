"use client";

import { AiFillBackward, AiFillDelete, AiFillSave, AiOutlinePlus } from "react-icons/ai";
import { Rnd } from "react-rnd";
import { useRouter } from "next/navigation";
import { CompProps, DEFAULT_DIV, DEFAULT_IMAGE, DEFAULT_TEXT } from "../../../types";

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
  elements: CompProps[];
  select: (id: string) => void;
  setElements: (elements: CompProps[]) => void;
  update: () => void;
}) => {
  const router = useRouter();
  return (
    <div className="bg-base-100 h-full flex flex-col text-base-content border-t">
      <div
        className=" w-full bg-base-300 uppercase font-bold text-center py-3 text-lg mb-2 cursor-pointer flex items-center justify-between px-3"
        onClick={() => select("")}
      >
        <AiFillBackward
          onClick={() => router.push(`/templates/${id}`)}
          className="text-lg hover:text-primary"
        />
        {name}
        <AiFillSave onClick={update} className="text-lg hover:text-primary" />
      </div>
      <Elements elements={elements} select={select} selected={selected} setElements={setElements} />
      <AddElement elements={elements} setElements={setElements} />
      <div className="mt-auto flex justify-between p-2">
        <a href={`/api/images/${id}`} target="_blank" rel="noreferrer">
          VIEW
        </a>
        <a href={`/api/images/${id}`} target="_blank" download rel="noreferrer">
          DOWNLOAD
        </a>
      </div>
    </div>
  );
};
type ElementWLevel = {
  element: CompProps;
  level: number;
  parentId: string;
  pos: number;
};
export const Elements = ({
  selected,
  elements,
  select,
  setElements,
}: {
  selected?: string;
  elements: CompProps[];
  select: (id: string) => void;
  setElements: (elements: CompProps[]) => void;
}) => {
  const recursion = (elements: CompProps[], level: number, parentId: string): ElementWLevel[] => {
    return elements.flatMap((element, pos) =>
      element.type === "div"
        ? ([
            { element, level, parentId, pos },
            ...recursion(element.children, level + 1, element.id),
          ] as ElementWLevel[])
        : [{ element, level, parentId, pos }]
    );
  };
  const elems = recursion(elements, 0, "");
  const height = 30;
  const step = 15;
  return (
    <div className="h-full">
      {elems.map(({ element, level }, index) => (
        <Rnd
          key={index}
          bounds="parent"
          enableResizing={false}
          disableDragging={selected !== element.id}
          dragGrid={[height, height]}
          size={{ width: 200, height }}
          position={{ x: level * step, y: index * height }}
          onClick={() => select(element.id)}
          onDragStop={(e, d) => {
            const newIndex = Math.round(d.y / height);
            const newLevel = Math.round(d.x / step);

            const oldElem = elems[newIndex];
            // If the element is moved inside a div but to a lower level
            if (oldElem && oldElem.level > newLevel) return console.log("Invalid drag!");

            const newParentId =
              oldElem?.level === newLevel ? oldElem.parentId : oldElem?.element?.id || "";
            const newPos = oldElem?.level === newLevel ? oldElem.pos : 0;

            //find the old element and delete that and insert the new one
            const recursion = (elements: CompProps[], parentId: string): CompProps[] => {
              const newElems = elements.map((e) => {
                if (e.id === element.id) return null;
                if (e.type === "div") return { ...e, children: recursion(e.children, e.id) };

                return e;
              });
              if (newParentId === parentId) newElems.splice(newPos, 0, element);
              return newElems.filter((e) => e !== null) as CompProps[];
            };
            setElements(recursion(elements, ""));
          }}
        >
          <div
            className={`cursor-pointer flex justify-between items-center py-1 px-2 ${
              selected === element.id ? "bg-primary" : ""
            }`}
          >
            <p>{element.id}</p>
            <AiFillDelete
              onClick={() => {
                const recursion = (elements: CompProps[]): CompProps[] => {
                  const newElems = elements.map((e) => {
                    if (e.id === element.id) return null;
                    if (e.type === "div") return { ...e, children: recursion(e.children) };

                    return e;
                  });
                  return newElems.filter((e) => e !== null) as CompProps[];
                };
                setElements(recursion(elements));
              }}
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
  elements: CompProps[];
  setElements: (elements: CompProps[]) => void;
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
