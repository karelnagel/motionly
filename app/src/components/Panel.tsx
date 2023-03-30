import { Right } from "../pages/Edit/Right";
import { Resize } from "./Resize";

export function Panel({
  width,
  setWidth,
  items,
  tab,
  reverse,
}: {
  items: { [key: string]: Right };
  tab?: string;
  width: number;
  reverse?: boolean;
  setWidth: (value: number) => void;
}) {
  const Component = items[tab || ""]?.component;
  return (
    <div style={{ width }} className="w-full relative shrink-0">
      {Component && (
        <div className="bg-base-200 h-full p-2 overflow-y-auto overflow-x-hidden">
          <Component />
          <Resize value={width} setValue={setWidth} reverse={reverse} />
        </div>
      )}
    </div>
  );
}
