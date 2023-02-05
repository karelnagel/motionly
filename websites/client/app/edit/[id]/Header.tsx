import Link from "next/link";
import { IoIosArrowBack, IoMdRedo, IoMdUndo } from "react-icons/io";
import { useStore } from "../../../hooks/useStore";

export const Header = () => {
  const name = useStore((s) => s.project.name);
  const setSelected = useStore((s) => s.setSelected);
  const set = useStore((s) => s.set);
  const selected = useStore((s) => s.selected);
  const undo = useStore((s) => s.undo);
  const redo = useStore((s) => s.redo);
  const future = useStore((s) => s.future);
  const past = useStore((s) => s.past);

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
        <Button title="Add" value="add" tooltip="2" />

      </div>
      <p className="flex flex-col items-center space-y-1 leading-none">
        <input
          value={name}
          placeholder="Untitled"
          onChange={(e) =>
            set((s) => {
              s.project.name = e.target.value;
            })
          }
          className="text-[22px] font-bold text-center bg-transparent input input-sm "
        />
      </p>
      <div className="flex items-center space-x-4 font-bold w-full justify-end">
        <div className="flex text-2xl space-x-2">
          <div className="tooltip tooltip-bottom" data-tip="⌘ + Z">
            <IoMdUndo
              onClick={undo}
              className={`${
                past.length ? "cursor-pointer" : "opacity-30 cursor-default"
              }`}
            />
          </div>
          <div className="tooltip tooltip-bottom" data-tip="⌘ + ⇧ + Z">
            <IoMdRedo
              onClick={redo}
              className={`${
                future.length ? "cursor-pointer" : "opacity-30 cursor-default"
              }`}
            />
          </div>
        </div>

        {/* <Button title="AI" value="ai" tooltip="1" /> */}
        <Button title="Template" value="template" tooltip="3" />
        <Button title="Inputs" value="inputs" tooltip="4" />
        {/* <Button title="Export" value="export" tooltip="4" /> */}
      </div>
    </div>
  );
};
