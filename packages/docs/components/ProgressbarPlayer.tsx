import { defaultProgressbarProps, ProgressbarTypes } from "@asius/components";
import { useState } from "react";
import { DocsPlayer } from "./DocsPlayer";
import { SelectInput } from "./SelectInput";

export const ProgressbarPlayer = () => {
  const [progressbarType, setProgressbarType] = useState("square");
  return (
    <>
      <SelectInput
        value={progressbarType}
        onChange={setProgressbarType}
        options={Object.entries(ProgressbarTypes).map(([value, label]) => ({
          value,
          label,
        }))}
      />
      <DocsPlayer
        {...defaultProgressbarProps}
        height={
          progressbarType === "square" || progressbarType === "circle"
            ? defaultProgressbarProps.height
            : 100
        }
        progressBarType={progressbarType as any}
      />
    </>
  );
};
