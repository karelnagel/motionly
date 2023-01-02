import { postNewTemplate } from "@asius/sdk";
import { TemplateType } from "@asius/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
export const Header = ({
  selected,
  setSelected,
  template,
  saveInfo,
}: {
  selected: string;
  setSelected: (s: string) => void;
  template: TemplateType;
  saveInfo: string;
}) => {
  const router = useRouter();
  const clone = async () => {
    const newTemplate = await postNewTemplate(template);
    if (!newTemplate) return alert("Cloning failed");
    alert("Cloning successful");
    router.push(`/templates/${newTemplate.id}`);
  };
  return (
    <div className="w-full grid grid-cols-3 place-items-center items-center bg-base-100 shadow-lg px-3 py-2 ">
      <div className="flex space-x-2 items-center w-full">
        <Link href="/">
          <Image
            src={"/favicon.png"}
            width={40}
            height={40}
            alt="logo"
            className="-rotate-90 hover:scale-110 duration-200"
          />
        </Link>
      </div>
      {template.isOwner ? (
        <div
          className={` font-semibold ${
            saveInfo.includes("Error") ? "text-error" : ""
          }`}
        >
          {saveInfo}
        </div>
      ) : (
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
      <div className="flex items-center space-x-2 font-bold w-full justify-end">
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
