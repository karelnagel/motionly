import { Toaster } from "sonner";
import { pages } from "./pages";
import { useStore } from "./store";
import "./styles.css";

export const App = () => {
  const page = useStore((s) => s.page);
  const Page = pages[page];
  return (
    <>
      <Toaster position="top-center" />
      <Page />
    </>
  );
};
