import { IoMdRedo, IoMdUndo } from "react-icons/io";
import { useLeftStore, useTemplate, useTemplateStore } from "../../../store";

export const Header = () => {
  const name = useTemplate((t) => t.name);
  const editTemplate = useTemplateStore((s) => s.editTemplate);
  const undo = useTemplateStore((s) => s.undo);
  const redo = useTemplateStore((s) => s.redo);
  const future = useTemplateStore((s) => s.future);
  const past = useTemplateStore((s) => s.past);
  const setTab = useLeftStore((s) => s.setTab);

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
          <button className="btn-ghost" data-tip="⌘ + Z" disabled={!past.length}>
            <IoMdUndo onClick={past.length ? undo : undefined} />
          </button>
          <button className="btn-ghost" data-tip="⌘ + ⇧ + Z" disabled={!future.length}>
            <IoMdRedo onClick={future.length ? redo : undefined} />
          </button>
        </div>
        <button className="btn-primary" onClick={() => setTab("add")}>
          Export
        </button>
      </div>
    </div>
  );
};
