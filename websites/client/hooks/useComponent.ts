import { ComponentProps } from "@motionly/base";
import { useCallback } from "react";
import { useStore } from "./useStore";

export const useComponent = (id?: string): ComponentProps | undefined => {
  return (
    useStore(
      useCallback(
        (state) => state.project.template.components[id || state.selected],
        [id]
      )
    ) || undefined
  );
};
