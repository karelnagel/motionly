import { Right } from "../pages/Edit/Right";

export function Tabs<T extends string>({
  order,
  items,
  onClick,
  selected,
}: {
  selected?: T;
  order: T[];
  items: { [key: string]: Right };
  onClick: (i: T) => void;
}) {
  return (
    <div className="h-full flex flex-col w-14 border-r border-l border-base-300 bg-base-100">
      {order.map((i) => {
        const item = items[i];
        return (
          <div
            key={i.toString()}
            onClick={() => onClick(i)}
            className={`flex aspect-square justify-center flex-col items-center hover:scale-105 duration-150 p-2 cursor-pointer ${
              selected === i ? "bg-primary" : "hover:bg-base-300"
            }`}
          >
            <item.icon />
            <p className="text-xs ">{item.title}</p>
          </div>
        );
      })}
    </div>
  );
}
