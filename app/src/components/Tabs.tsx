import { IconType } from "react-icons";
import { Left } from "../pages/Edit/Left";

export type Tab = {
  icon: IconType | (() => JSX.Element);
  title: string;
  component: () => JSX.Element;
};
export function Tabs<T extends string>({
  order,
  items,
  onClick,
  selected,
  Button,
}: {
  selected?: T;
  Button: () => JSX.Element;
  order: T[];
  items: { [key: string]: Left };
  onClick: (i: T) => void;
}) {
  return (
    <div className="h-full flex flex-col w-14 border-r border-l border-base-200 bg-base-100 shrink-0">
      <div className="h-full">
        {order.map((i) => {
          const item = items[i];
          return (
            <div
              key={i.toString()}
              onClick={() => onClick(i)}
              className={`flex flex-col w-full justify-center h-14 space-y-1 items-center hover:scale-105 duration-150 p-2 cursor-pointer ${
                selected === i ? "bg-primary text-primary-content" : "hover:bg-base-300"
              }`}
            >
              <div className="text-2xl">
                <item.icon />
              </div>
              <p className="text-[10px] overflow-hidden">{item.title}</p>
            </div>
          );
        })}
      </div>

      <div className="h-14 cursor-pointer border-t border-base-200 flex items-center justify-center">
        <Button />
      </div>
    </div>
  );
}
