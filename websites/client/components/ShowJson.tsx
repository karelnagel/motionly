import { ReactNode, useState } from "react";
import { TextInput } from "./inputs";

export const ShowJson = ({
  children,
  label,
  json,
  onChange,
}: {
  children: ReactNode;
  label: string;
  json: string;
  onChange: (j: string) => void;
}) => {
  const [showJson, setShowJson] = useState(true);

  return (
    <div className="col-span-2">
      <div className="flex justify-between items-center my-2">
        <p className="label label-text">{label}</p>
        <button className="btn btn-xs" onClick={() => setShowJson(!showJson)}>
          {showJson ? "Inputs" : "JSON"}
        </button>
      </div>
      <div>
        {showJson ? (
          <TextInput
            area
            label=""
            className="min-h-[100px]"
            value={json}
            onChange={(json) => onChange(json)}
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
};
