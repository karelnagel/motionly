import { postNewTemplate } from "@asius/sdk";
import { TemplateType } from "@asius/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosArrowBack, IoMdRedo, IoMdUndo } from "react-icons/io";
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
  undo,
  redo,
}: {
  selected: string;
  setSelected: (s: string) => void;
  template: TemplateType;
  saveTime?: Date;
  undo?: () => void;
  redo?: () => void;
}) => {
  const router = useRouter();
  const clone = async () => {
    const newTemplate = await postNewTemplate(template);
    if (!newTemplate) return alert("Cloning failed");
    alert("Cloning successful");
    router.push(`/templates/${newTemplate.id}`);
  };
  const Button = ({ title, value }: { title: string; value: string }) => {
    return (
      <button
        onClick={() => setSelected(value)}
        className={`${
          selected === value ? "text-primary-content gradient" : ""
        } bg-base-200 p-2 rounded-lg min-w-[60px]`}
      >
        {title}
      </button>
    );
  };
  return (
    <div className="shrink-0 w-full grid grid-cols-3 place-items-center items-center bg-base-100 shadow-lg px-3 h-[60px]">
      <div className="flex space-x-2 items-center w-full">
        <Link href="/">
          <IoIosArrowBack className="text-3xl font-bold" />
        </Link>
      </div>
      {template.isOwner ? (
        <p className="flex flex-col items-center space-y-1 leading-none">
          <span className="text-[22px] font-bold">{template.name}</span>
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
      <div className="flex items-center space-x-4 font-bold w-full justify-end">
        <div className="flex text-2xl space-x-2">
          <IoMdUndo
            onClick={undo}
            className={`${
              undo ? "cursor-pointer" : "opacity-30 cursor-default"
            }`}
          />
          <IoMdRedo
            onClick={redo}
            className={`${
              redo ? "cursor-pointer" : "opacity-30 cursor-default"
            }`}
          />
        </div>

        <Button title="AI" value="ai" />

        <Button title="Add" value="add" />
        <Button title="Template" value="template" />
        <Button title="Export" value="export" />
      </div>
    </div>
  );
};
