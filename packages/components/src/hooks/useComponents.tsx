import { Components } from "@motionly/base";
import { createContext, ReactNode, useContext } from "react";

const ComponentsContext = createContext({
  components: {} as Components,
});

export const useComponents = () => {
  const { components } = useContext(ComponentsContext);
  return components;
};

export const ComponentsProvider = ({
  components,
  children,
}: {
  components: Components;
  children: ReactNode;
}) => {
  return (
    <ComponentsContext.Provider value={{ components }}>
      {children}
    </ComponentsContext.Provider>
  );
};
