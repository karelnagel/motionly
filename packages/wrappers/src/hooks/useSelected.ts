import { createContext, useContext } from "react";

export const SelectedContext = createContext<{
  setSelected: (id: string) => void;
  selectedRef?: React.MutableRefObject<HTMLDivElement | null> | null;
  selected?: string;
}>({
  setSelected: (id: string) => {
    console.log(`No context ${id}`);
  },
  selectedRef: null,
  selected: "",
});

export const useSelected = () => useContext(SelectedContext);
