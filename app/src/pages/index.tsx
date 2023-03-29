import { render } from "./Render";
import { edit } from "./Edit";
import { home } from "./Home";

export const pages = {
  home,
  edit,
  render,
};

export type Page = keyof typeof pages;
