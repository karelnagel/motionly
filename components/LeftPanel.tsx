import { AiFillDelete } from "react-icons/ai";
import { ElementType } from "../types";
import { DEFAULT_DIV, DEFAULT_IMAGE, DEFAULT_TEXT } from "../types/defaults";

export const LeftPanel = ({
  selected,
  elements,
  select,
  id,
  setElements,
}: {
  id: string;
  selected?: string;
  elements: ElementType[];
  select: (id: string) => void;
  setElements: (elements: ElementType[]) => void;
}) => {
  return (
    <div className="bg-gray-600 h-full flex flex-col">
      <p
        className=" w-full bg-blue-300 uppercase font-bold text-center py-3 text-lg mb-2 cursor-pointer"
        onClick={() => select(id)}
      >
        {id}
      </p>
      <Elements elements={elements} select={select} selected={selected} setElements={setElements} />
      <div className="pt-4">
        <p>Add</p>
        <div className="grid grid-cols-3">
          <button
            onClick={() =>
              setElements([...elements, DEFAULT_IMAGE(`image-${elements.length + 1}`)])
            }
          >
            image
          </button>
          <button
            onClick={() => setElements([...elements, DEFAULT_TEXT(`text-${elements.length + 1}`)])}
          >
            text
          </button>
          <button
            onClick={() => setElements([...elements, DEFAULT_DIV(`div-${elements.length + 1}`)])}
          >
            div
          </button>
        </div>
      </div>
      <div className="mt-auto flex justify-between p-2">
        <button>SAVE</button>
        <a href="/api/image" target="_blank">
          VIEW
        </a>
        <a href="/api/image" target="_blank" download>
          DOWN
        </a>
      </div>
    </div>
  );
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
  return (
    <div className="">
      {elements.map((element, index) => (
        <div key={index}>
          <div
            onClick={() => select(element.id)}
            className="cursor-pointer flex justify-between items-center py-1 px-2"
            style={{ background: selected === element.id ? "red" : "transparent" }}
          >
            <p>{element.id}</p>
            <AiFillDelete
              onClick={() => setElements(elements.filter((e) => e.id !== element.id))}
            />
          </div>
          {element.type === "div" && (
            <div className="ml-2">
              <Elements
                elements={element.children}
                select={select}
                selected={selected}
                setElements={(el) =>
                  setElements(
                    elements.map((e) => {
                      if (e.id === element.id) {
                        return { ...e, children: el };
                      }
                      return e;
                    })
                  )
                }
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
