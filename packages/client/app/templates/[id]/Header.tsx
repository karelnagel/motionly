import { MdArrowBack } from "react-icons/md";
import { SidePanelType } from "../../../types";
import Image from "next/image";

export const Header = ({
  show,
  setShow,
}: {
  show: SidePanelType;
  setShow: (s: SidePanelType) => void;
}) => {
  return (
    <div className="w-full flex justify-between items-center bg-base-100 shadow-lg">
      <div className="flex space-x-3 items-center">
        <MdArrowBack />
        <Image src="/logo.png" width={100} height={100} alt="logo" />
      </div>
      <div>
        <button onClick={() => setShow("template")}>Template</button>
        <button onClick={() => setShow("export")}>Export</button>
        <button onClick={() => setShow("add")}>Add</button>
        {show && <button onClick={() => setShow(undefined)}>X</button>}
      </div>
    </div>
  );
};
