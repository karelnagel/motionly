import {
  IoIosCloudDone,
  IoMdRedo,
  IoMdUndo,
} from "react-icons/io";
import { useStore } from "../../../../hooks/useStore";

export const Header = () => {
  const name = useStore((s) => s.project.name);
  const saveTimeout = useStore((s) => s.saveTimeout);
  const set = useStore((s) => s.set);
  const undo = useStore((s) => s.undo);
  const redo = useStore((s) => s.redo);
  const future = useStore((s) => s.future);
  const past = useStore((s) => s.past);

  return (
    <div className="shrink-0 flex justify-between items-center p-3">
      <input
        value={name}
        placeholder="Untitled"
        onChange={(e) =>
          set((s) => {
            s.project.name = e.target.value;
          })
        }
        className="text-[18px] font-bold bg-transparent input input-xs w-40"
      />
      <div className="flex items-center space-x-4 font-bold ">
        <button
          className={`${
            saveTimeout ? "loading" : ""
          } btn btn-disabled btn-sm text-xl`}
        >
          {!saveTimeout && <IoIosCloudDone />}
        </button>
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
        <button className="btn btn-primary btn-sm">export </button>
      </div>
    </div>
  );
};
