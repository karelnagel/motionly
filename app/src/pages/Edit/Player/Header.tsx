import { IoMdRedo, IoMdUndo } from "react-icons/io";
import { useStore } from "../../../store";

export const Header = () => {
  const name = useStore((s) => s.templates[s.template].name);
  const editTemplate = useStore((s) => s.editTemplate);
  const undo = useStore((s) => s.undo);
  const redo = useStore((s) => s.redo);
  const future = useStore((s) => s.future);
  const past = useStore((s) => s.past);
  const setTab = useStore((s) => s.setLeftTab);

  return (
    <div className="shrink-0 flex justify-between items-center p-3">
      <input
        value={name}
        placeholder="Untitled"
        onChange={(e) => editTemplate({ name: e.target.value })}
        className="text-[16px] font-bold bg-transparent input input-xs w-40"
      />
      <div className="flex items-center space-x-4 font-bold ">
        <div className="flex text-2xl space-x-2">
          <div className="tooltip tooltip-bottom" data-tip="⌘ + Z">
            <IoMdUndo onClick={past.length ? undo : undefined} className={`${past.length ? "cursor-pointer" : "opacity-30 cursor-default"}`} />
          </div>
          <div className="tooltip tooltip-bottom" data-tip="⌘ + ⇧ + Z">
            <IoMdRedo onClick={future.length ? redo : undefined} className={`${future.length ? "cursor-pointer" : "opacity-30 cursor-default"}`} />
          </div>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setTab("add")}>
          Export
        </button>
      </div>
    </div>
  );
};
