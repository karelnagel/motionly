import { useContext } from "react";
import { Context } from "../components/TemplateContext/Context";

export const useTemplate = () => {
  return useContext(Context);
};
