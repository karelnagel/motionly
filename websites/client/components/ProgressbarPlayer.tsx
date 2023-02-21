import { ProgressbarTypes } from "@motionly/base";
import { defaultProgressbarProps } from "@motionly/components";
import { useState } from "react";
import { DocsPlayer } from "./DocsPlayer";

export const ProgressbarPlayer = () => {
  const [progressbarType, setProgressbarType] = useState("square");
  return (
    <>
     
      <DocsPlayer
        {...defaultProgressbarProps}
        type={progressbarType as ProgressbarTypes}
      />
    </>
  );
};
