import { IoIosClose } from "react-icons/io";

export const StringArray = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (s: string[]) => void;
}) => {
  const current = value[value.length - 1];
  const others = value.slice(0, value.length - 1);
  return (
    <div className="textarea textarea-bordered w-full bg-base-200 grid grid-cols-3 gap-2">
      {others.map((s, i) => {
        return (
          <div
            key={i}
            className="flex justify-between bg-base-100 rounded-lg p-1 space-x-1 overflow-hidden"
          >
            <p className="overflow-hidden">{s}</p>
            <button
              onClick={() => {
                const newValue = [...others];
                newValue.splice(i, 1);
                onChange([...newValue, current]);
              }}
            >
              <IoIosClose />
            </button>
          </div>
        );
      })}
      <input
        type="text"
        className="bg-transparent"
        value={current || ""}
        onChange={(e) => onChange([...others, e.target.value])}
        onKeyDown={(e) => {
          if ([",", " ", "Enter", "Tab"].includes(e.key)) {
            onChange([...value, ""]);
          }
          if (current === "" && e.key === "Backspace") onChange(others);
        }}
      />
    </div>
  );
};
