import Link from "next/link";
import { IoIosArrowBack, IoMdRedo, IoMdUndo } from "react-icons/io";
import { useEffect, useState } from "react";
import { useTemplate } from "../../../hooks/useTemplate";

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

export const Header = () => {
  const { template, setSelected, selected, saveTime, undo, redo } =
    useTemplate();

  const Button = ({
    title,
    value,
    tooltip,
  }: {
    title: string;
    value: string;
    tooltip?: string;
  }) => {
    return (
      <div className="tooltip tooltip-bottom" data-tip={tooltip}>
        <button
          onClick={() => setSelected(value)}
          className={`${
            selected === value ? "text-primary-content gradient" : ""
          } bg-base-200 p-2 rounded-lg min-w-[60px]`}
        >
          {title}
        </button>
      </div>
    );
  };
  return (
    <div className="shrink-0 w-full grid grid-cols-3 place-items-center items-center bg-base-100 shadow-lg px-3 h-[60px]">
      <div className="flex space-x-2 items-center w-full">
        <Link href="/">
          <IoIosArrowBack className="text-3xl font-bold" />
        </Link>
      </div>
      <p className="flex flex-col items-center space-y-1 leading-none">
        <span
          onClick={() => setSelected("template")}
          className="text-[22px] font-bold cursor-pointer"
        >
          {template.name}
        </span>
        {saveTime && (
          <span className="text-[10px] opacity-60">
            saved <TimeAfter time={saveTime} />
          </span>
        )}
      </p>
      <div className="flex items-center space-x-4 font-bold w-full justify-end">
        <div className="flex text-2xl space-x-2">
          <div className="tooltip tooltip-bottom" data-tip="⌘ + Z">
            <IoMdUndo
              onClick={undo}
              className={`${
                undo ? "cursor-pointer" : "opacity-30 cursor-default"
              }`}
            />
          </div>
          <div className="tooltip tooltip-bottom" data-tip="⌘ + ⇧ + Z">
            <IoMdRedo
              onClick={redo}
              className={`${
                redo ? "cursor-pointer" : "opacity-30 cursor-default"
              }`}
            />
          </div>
        </div>

        <Button title="AI" value="ai" tooltip="1" />
        <Button title="Add" value="add" tooltip="2" />
        <Button title="Template" value="template" tooltip="3" />
        <Button title="Inputs" value="inputs" tooltip="4" />
        <Button title="Export" value="export" tooltip="4" />
      </div>
    </div>
  );
};
