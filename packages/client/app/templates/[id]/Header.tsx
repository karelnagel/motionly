import { postNewTemplate } from "@asius/sdk";
import { TemplateType } from "@asius/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
export const Header = ({
  selected,
  setSelected,
  template,
}: {
  selected: string;
  setSelected: (s: string) => void;
  template: TemplateType;
}) => {
  const rounter = useRouter();
  const clone = async () => {
    const newTemplate = await postNewTemplate(template);
    if (newTemplate) rounter.push(`/templates/${newTemplate.id}`);
  };
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
      {!template.isOwner && (
        <div className="text-white bg-error flex p-2 space-x-3 rounded-lg items-center">
          <p>This template is read only, clone it to edit!</p>
          <button
            className="bg-primary text-primary-content rounded-lg py-1 px-3"
            onClick={clone}
          >
            Clone
          </button>
        </div>
      )}
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
