import Image from "next/image";
import Link from "next/link";

export const Header = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (s: string) => void;
}) => {
  return (
    <div className="w-full flex justify-between items-center bg-base-100 shadow-lg px-3 py-2 ">
      <div className="flex space-x-2 items-center">
        <Link href="/">
          <Image
            src={"/favicon.png"}
            width={40}
            height={40}
            alt="logo"
            className="-rotate-90 hover:scale-110 duration-200"
          />
        </Link>
        {/* <Link href={process.env.NEXT_PUBLIC_DOCS_URL || ""} target="_blank">
          <Image src="/asius.png" width={100} height={100} alt="logo" />
        </Link> */}
      </div>
      <div className="flex items-center space-x-2 font-bold">
        <button
          onClick={() => setSelected("template")}
          className={`${
            selected === "template" ? "text-primary" : ""
          } uppercase`}
        >
          Template
        </button>
        <button
          onClick={() => setSelected("export")}
          className={`${selected === "export" ? "text-primary" : ""} uppercase`}
        >
          Export
        </button>
        <button
          onClick={() => setSelected("add")}
          className={`${selected === "add" ? "text-primary" : ""} uppercase`}
        >
          Add
        </button>
        {selected && <button onClick={() => setSelected("")}>X</button>}
      </div>
    </div>
  );
};
