import { IoIosCloudDone, IoMdRedo, IoMdUndo } from "react-icons/io";
import { LoadingSpinner } from "../../../../components/LoadingSpinner";
import { useProject } from "../../../../hooks/useProject";

export const Header = () => {
  const name = useProject((s) => s.project.name);
  const saveTimeout = useProject((s) => s.saveTimeout);
  const set = useProject((s) => s.set);
  const undo = useProject((s) => s.undo);
  const redo = useProject((s) => s.redo);
  const future = useProject((s) => s.future);
  const past = useProject((s) => s.past);
  const setTab = useProject((s) => s.leftSetTab);

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
        <div className="h-6 w-6">
          {!saveTimeout ? (
            <IoIosCloudDone className="h-full w-full" />
          ) : (
            <LoadingSpinner />
          )}
        </div>
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
        <button className="btn btn-primary" onClick={() => setTab("export")}>
          Export
        </button>
      </div>
    </div>
  );
};
