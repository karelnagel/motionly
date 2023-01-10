import { postNewTemplate } from "@asius/sdk";
import { TemplateType } from "@asius/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";

export const TimeAfter = ({
  time,
  className,
}: {
  time: Date;
  className?: string;
}) => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    };
  }, []);
  const diff = +date - +time;
  const seconds = Math.floor(diff / 1000);
  return (
    <span className={className}>
      {seconds <= 0 ? "now" : `${seconds} seconds ago`}
    </span>
  );
};

export const Header = ({
  selected,
  setSelected,
  template,
  saveTime,
}: {
  selected: string;
  setSelected: (s: string) => void;
  template: TemplateType;
  saveTime?: Date;
}) => {
  const router = useRouter();
  const clone = async () => {
    const newTemplate = await postNewTemplate(template);
    if (!newTemplate) return alert("Cloning failed");
    alert("Cloning successful");
    router.push(`/templates/${newTemplate.id}`);
  };
  return (
    <div className="w-full grid grid-cols-3 place-items-center items-center bg-base-100 shadow-lg px-3 h-[70px]">
      <div className="flex space-x-2 items-center w-full">
        <Link href="/">
          <IoIosArrowBack className="text-3xl" />
        </Link>
      </div>
      {template.isOwner ? (
        <p className="flex flex-col items-center">
          <span className="text-lg font-bold">{template.name}</span>
          {saveTime && (
            <span className="text-[10px] opacity-60">
              saved <TimeAfter time={saveTime} />
            </span>
          )}
        </p>
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
          onClick={() => setSelected("ai")}
          className={`${selected === "ai" ? "text-primary" : ""} uppercase`}
        >
          AI
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
