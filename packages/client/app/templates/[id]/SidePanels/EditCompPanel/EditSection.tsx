import { useState } from "react";

export const EditSection = ({
  children,
  title,
  className,
  level = 0,
  hideByDefault = false,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
  level?: number;
  hideByDefault?: boolean;
}) => {
  const [hidden, setHidden] = useState(hideByDefault);
  return (
    <div
      className={`${className} ${
        level ? " space-y-1" : "border-t-2 py-2 space-y-2"
      } `}
    >
      <div className="flex justify-between">
        <h1 className={`${level ? "" : "font-bold text-xl"}`}>{title}</h1>
        <button className="text-xs" onClick={() => setHidden((h) => !h)}>
          {hidden ? "SHOW" : "HIDE"}
        </button>
      </div>
      {!hidden && (
        <div className="w-full grid grid-cols-2 gap-3">{children}</div>
      )}
    </div>
  );
};
