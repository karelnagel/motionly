import { createStore } from "zustand";
import { createContext, useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useStore } from "zustand";
import { Comp, Template } from "../types";

interface CompositionState {
  template?: Template;
  setComponent: (id?: string) => void;
}

type CompositionStore = ReturnType<typeof createCompositionStore>;

type CompositionProps = { template?: Template; setComponent: (id?: string) => void };

const createCompositionStore = ({ template, setComponent: setComp }: CompositionProps) => {
  return createStore<CompositionState>()((set) => ({
    template: template,
    setComponent: (component) => setComp(component),
  }));
};

const CompositionContext = createContext<CompositionStore | null>(null);

type CompositionProviderProps = React.PropsWithChildren<CompositionProps>;

export function CompositionProvider({ children, ...props }: CompositionProviderProps) {
  const storeRef = useRef<CompositionStore>();
  if (!storeRef.current) {
    storeRef.current = createCompositionStore(props);
  }
  useEffect(() => {
    storeRef.current?.setState(props);
  }, [props]);

  return <CompositionContext.Provider value={storeRef.current}>{children}</CompositionContext.Provider>;
}

export function useCompositionStore<T>(selector: (state: CompositionState) => T, equalityFn?: (left: T, right: T) => boolean): T {
  const store = useContext(CompositionContext);
  if (!store) throw new Error("Missing CompositionContext.Provider in the tree");
  return useStore(store, selector, equalityFn);
}

export function useComponent<T = Comp>(fn: (t: Comp) => T = (t) => t as T, id: string): T {
  return useCompositionStore((s) => {
    if (!s.template) throw new Error("No template");
    const comp = s.template.components[id || ""];
    if (!comp) throw new Error("No component");
    return fn(comp);
  });
}
