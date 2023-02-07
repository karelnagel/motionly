import { ComponentProps } from "@motionly/base";
import { useCallback } from "react";
import { useProject } from "./useProject";

export const useComponent = (id?: string): ComponentProps | undefined => {
  return (
    useProject(
      useCallback(
        (state) => state.project.template.components[id || state.selected],
        [id]
      )
    ) || undefined
  );
};
