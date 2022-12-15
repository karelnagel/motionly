import { MdArrowBackIos } from "react-icons/md";
import { SidePanelType } from "../../../types";
import Image from "next/image";
import Link from "next/link";

export const Header = ({
  show,
  setShow,
}: {
  show: SidePanelType;
  setShow: (s: SidePanelType) => void;
}) => {
  return (
    <div className="w-full flex justify-between items-center bg-base-100 shadow-lg px-3 ">
      <div className="flex space-x-2 items-center">
        <Link href="/">
          <MdArrowBackIos className="text-2xl" />
        </Link>
        <Link href={process.env.NEXT_PUBLIC_DOCS_URL || ""} target="_blank">
          <Image src="/logo.png" width={100} height={100} alt="logo" />
        </Link>
      </div>
      <div className="flex items-center space-x-2 font-bold">
        <button
          onClick={() => setShow("template")}
          className={`${show === "template" ? "text-primary" : ""} uppercase`}
        >
          Template
        </button>
        <button
          onClick={() => setShow("export")}
          className={`${show === "export" ? "text-primary" : ""} uppercase`}
        >
          Export
        </button>
        <button
          onClick={() => setShow("add")}
          className={`${show === "add" ? "text-primary" : ""} uppercase`}
        >
          Add
        </button>
        {show && <button onClick={() => setShow(undefined)}>X</button>}
      </div>
    </div>
  );
};
