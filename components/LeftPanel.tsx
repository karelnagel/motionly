import { ElementType } from "../types";

export const LeftPanel = ({
  selected,
  elements,
  select,
  id,
}: {
  id: string;
  selected?: string;
  elements: ElementType[];
  select: (id: string) => void;
}) => {
  return (
    <div className="bg-gray-600 h-full">
      <p
        className=" w-full bg-blue-300 uppercase font-bold text-center py-3 text-lg mb-2 cursor-pointer"
        onClick={() => select(id)}
      >
        {id}
      </p>
      <Elements elements={elements} select={select} selected={selected} />
    </div>
  );
};

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
    <div className="">
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
