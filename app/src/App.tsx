import { Toaster } from "sonner";
import { pages } from "./pages";
import { useTemplateStore } from "./store";
import "./styles.css";

export const App = () => {
  const page = useTemplateStore((s) => s.page);
  const Page = pages[page];
  return (
    <>
      <Toaster position="top-center" />
      <Page />
    </>
  );
};
